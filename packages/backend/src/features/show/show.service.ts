import { Service } from "@base/service";
import { Either } from "@shared/types";
import { LoggerService } from "@shared/services";
import { left, right } from "@shared/util";
import { NoMoviesInYourCity, QueryCityRequired } from "./show.errors";
import { Show } from "./show.model";
import { ShowRepository } from "./show.repository";
import { Filter } from "mongodb";
import {
  BaseShow,
  InvalidBookShowBody,
  NoMatchingShows,
  NotEnoughTickets,
  ShowBookUpdateError,
} from ".";
import { validateSync } from "class-validator";

export class ShowService extends Service {
  constructor(
    loggerService: LoggerService,
    protected showRepository: ShowRepository
  ) {
    super(loggerService);
  }

  async getShows(
    city_name?: string,
    movie_name?: string
  ): Promise<Either<Show[], QueryCityRequired | NoMoviesInYourCity>> {
    const query: Filter<Show> = {
      $and: [],
    };
    if (city_name !== undefined) {
      query.$and!.push({ city_name });
    }
    if (movie_name !== undefined) {
      query.$and!.push({ movie_name });
    }
    const result = await this.showRepository.find(
      query.$and!.length > 0 ? query : {}
    );
    if (result.length < 1) {
      return right(NoMoviesInYourCity.create());
    }
    return left(result);
  }

  async bookAShow(
    data: any
  ): Promise<
    Either<
      undefined,
      | InvalidBookShowBody
      | NoMatchingShows
      | NotEnoughTickets
      | ShowBookUpdateError
    >
  > {
    const showDetails = BaseShow.getInstance(data);

    const errors = validateSync(showDetails, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      const error = InvalidBookShowBody.create();
      error.errors = errors;
      return right(error);
    }

    const result = await this.showRepository.findOne({ _id: showDetails._id });
    if (result === null) {
      return right(NoMatchingShows.create(showDetails._id));
    }

    if (showDetails.seats > result.seats) {
      return right(NotEnoughTickets.create(result.seats));
    }

    const updateResult = await this.showRepository.update(
      { _id: showDetails._id },
      { $set: { seats: result.seats - showDetails.seats } }
    );
    if (updateResult.ok === 0) {
      return right(ShowBookUpdateError.create());
    }

    return left(undefined);
  }
}
