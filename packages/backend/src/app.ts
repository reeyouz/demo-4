import { LoggerService } from "@shared/services/logger.service";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { Logger } from "winston";
import { Controller } from "./base";
import { AppError, ConfigService } from "./shared";

export class Application {
  private _app = express();
  private logger: Logger;

  get app() {
    return this.configService.isTest ? this._app : null;
  }

  constructor(
    private configService: ConfigService,
    loggerService: LoggerService,
    controllers: Controller[] = []
  ) {
    this.logger = loggerService.logger;
    this.setupMiddlewares();
    this.setupRoutes(controllers);
    this._app.use(this.errorHandler.bind(this));
  }

  setupMiddlewares() {
    this._app.use(helmet());
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(this.requestLogger.bind(this));
  }

  requestLogger(req: Request, res: Response, next: NextFunction) {
    this.logger.info({
      url: req.url,
      method: req.method,
      ...(req.params !== undefined && { params: req.params }),
    });
    next();
  }

  setupRoutes(controllers: Controller[]) {
    for (let controller of controllers) {
      this.logger.debug(`Setting up ${controller.path}`);
      this._app.use(controller.path, controller.router);
    }
  }

  errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
    this.logger.error(err);
    res.status(err.status_code).send({ title: err.title, detail: err.detail });
  }

  listen(port?: number) {
    let PORT = port ?? this.configService.APP_PORT;
    this._app.listen(PORT, () => {
      this.logger.info(`Server listening on PORT ${PORT}`);
    });
  }
}
