import { createLogger, format, Logger, transports } from "winston";
import { ConfigService } from "./config.service";

export class LoggerService {
  logger: Logger;

  constructor(private configService: ConfigService) {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
      ),
    });

    if (!this.configService.isProd) {
      this.logger.level = "debug";
      this.logger.add(new transports.Console());
    }
  }
}
