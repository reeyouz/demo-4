import { Controller } from "@base/controller";
import { LoggerService } from "@shared/services";
import { NextFunction, Request, Response } from "express";
import { HealthCheckService } from "./health-check.service";

export class HealthCheckController extends Controller {
  public path: string;

  constructor(
    private healtCheckService: HealthCheckService,
    loggerService: LoggerService,
    controller_path = "/"
  ) {
    super(loggerService);
    this.path = controller_path;
    this.router.get(this.path, this.isWorking.bind(this));
  }

  isWorking(req: Request, res: Response, next: NextFunction) {
    const data = this.healtCheckService.getMessage();
    this.http.ok(data);
  }
}
