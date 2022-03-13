import { LoggerService } from "@shared/services";
import { Logger } from "winston";

export abstract class Service {
  protected logger: Logger;

  constructor(loggerService: LoggerService) {
    this.logger = loggerService.logger;
  }
}
