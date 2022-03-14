import { LoggerService } from "./logger.service";
import { ConfigService } from "./config.service";
import { MiddlewareService } from "./middleware.service";

export const configService = new ConfigService();
export const loggerService = new LoggerService(configService);
export const middlewareService = new MiddlewareService(
  loggerService,
  configService
);

export * from "./config.service";
export * from "./logger.service";
export * from "./middleware.service";
