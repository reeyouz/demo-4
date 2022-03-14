import { AppError } from "@base/error";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } from "@shared/consts";

export class QueryCityRequired extends AppError {
  constructor() {
    super("Invalid query!", BAD_REQUEST);
  }

  static create() {
    const error = new QueryCityRequired();
    error.message = "Query parameter city is required!";
    return error;
  }
}

export class NoMoviesInYourCity extends AppError {
  constructor() {
    super("No movies are playing in your city!", NOT_FOUND);
  }

  static create() {
    return new NoMoviesInYourCity();
  }
}

export class InvalidBookShowBody extends AppError {
  constructor() {
    super("Invalid body for booking a show!", BAD_REQUEST);
  }

  static create() {
    return new InvalidBookShowBody();
  }
}

export class NoMatchingShows extends AppError {
  constructor(_id: string) {
    super(`No matching shows for id ${_id}!`, BAD_REQUEST);
  }

  static create(_id: string) {
    return new NoMatchingShows(_id);
  }
}

export class NotEnoughTickets extends AppError {
  constructor(available: number) {
    super(`${available} tickets left!`, BAD_REQUEST);
  }

  static create(available: number) {
    return new NotEnoughTickets(available);
  }
}

export class ShowBookUpdateError extends AppError {
  constructor() {
    super(
      "An unexpected error occured while booking your show!",
      INTERNAL_SERVER_ERROR
    );
  }

  static create() {
    return new ShowBookUpdateError();
  }
}
