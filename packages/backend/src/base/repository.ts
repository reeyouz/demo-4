import { LoggerService } from "@shared/services";
import { Collection } from "mongodb";
import { Logger } from "winston";

export abstract class Repository<T> {
  protected logger: Logger;

  constructor(
    loggerService: LoggerService,
    protected collection: Collection<T>
  ) {
    this.logger = loggerService.logger;
  }
}
