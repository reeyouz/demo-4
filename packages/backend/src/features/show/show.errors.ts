import { AppError } from "@base/error";
import { BAD_REQUEST, NOT_FOUND } from "@shared/consts";

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
