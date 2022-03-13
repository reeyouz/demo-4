import { Service } from "@base/service";
import { LoggerService } from "@shared/services";

export class HealthCheckService extends Service {
  constructor(loggerService: LoggerService) {
    super(loggerService);
  }

  getMessage() {
    return { message: "Health Check is Working!" };
  }
}
