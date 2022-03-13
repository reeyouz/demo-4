import { Service } from "@base/service";
import { Either } from "@shared/types";
import { LoggerService } from "@shared/services";
import { left, right } from "@shared/util";
import { NoMoviesInYourCity, QueryCityRequired } from "./show.errors";
import { Show } from "./show.model";
import { ShowRepository } from "./show.repository";
import { Filter } from "mongodb";

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
}
