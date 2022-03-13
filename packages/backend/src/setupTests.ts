import { bootstrap } from "./bootstrap";
import { configService, DatabaseService, loggerService, TEST } from "./shared";

process.env.NODE_ENV = TEST;

if (!process.env.MONGO_DB_URI) {
  require("dotenv").config();
}

const databaseService = new DatabaseService(loggerService, configService);

export async function setupApp() {
  const result = await databaseService.connect();
  if (result.isRight()) {
    loggerService.logger.error("Could not connect to the database! Exiting...");
    process.exit(0);
  }

  return bootstrap(databaseService, "test-mega-project", "users");
}
