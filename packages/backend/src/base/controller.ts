import { LoggerService } from "@shared/services";
import { NextFunction, Request, Response, Router } from "express";
import { Logger } from "winston";
import { Http } from ".";

export abstract class Controller {
  logger: Logger;
  abstract path: string;
  router = Router();
  protected http!: Http;

  constructor(loggerService: LoggerService) {
    this.logger = loggerService.logger;
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      this.http = new Http(res);
      next();
    });
  }
}
