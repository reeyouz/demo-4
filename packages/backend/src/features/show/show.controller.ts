import { Controller } from "@base/controller";
import { LoggerService } from "@shared/services";
import { NextFunction, Request, Response } from "express";
import { ShowService } from "./show.service";

export class ShowController extends Controller {
  path: string;

  constructor(
    private showService: ShowService,
    loggerService: LoggerService,
    path = "/show"
  ) {
    super(loggerService);
    this.path = path;
    this.router.get("/", this.getShows.bind(this));
  }

  async getShows(req: Request, res: Response, next: NextFunction) {
    const city_name = req.query.city?.toString();
    const movie_name = req.query.movie?.toString();

    const result = await this.showService.getShows(city_name, movie_name);
    if (result.isLeft()) {
      return this.http.ok(result.value);
    }
    next(result.value);
  }
}
