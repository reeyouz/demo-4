import { LoggerService } from "./logger.service";
import { ConfigService } from "./config.service";

export const configService = new ConfigService();
export const loggerService = new LoggerService(configService);

export * from "./config.service";
export * from "./logger.service";
