import "./script";
import { bootstrap } from "./bootstrap";
import { DatabaseService, configService, loggerService } from "./shared";
import { Show, IShow } from "@features/show";

(async () => {
  const databaseService = new DatabaseService(loggerService, configService);
  const result = await databaseService.connect();
  if (result.isRight()) {
    loggerService.logger.error("Could not connect to the database! Exiting...");
    process.exit(0);
  }
  const databaseName = "mega-project";

  // BELOW CODE ONLY FOR DEMO PURPOSES
  databaseService.client
    ?.db(databaseName)
    .collection<IShow>("shows")
    .insertMany([
      new Show(
        "Avatar",
        "K-Star Mall",
        "Mumbai",
        new Date("2020-11-11T15:30:00"),
        new Date("2020-11-11T18:30:00")
      ).getObject(),
      new Show(
        "Pulp Fiction",
        "Inorbit Mall",
        "Pune",
        new Date("2021-01-05T10:30:00"),
        new Date("2021-01-05T12:00:00")
      ).getObject(),
      new Show(
        "Pulp Fiction",
        "Subhash Chandra Bose Mall",
        "Pune",
        new Date("2021-01-05T11:30:00"),
        new Date("2021-01-05T13:00:00")
      ).getObject(),

      new Show(
        "Avatar",
        "Subhash Chandra Bose Mall",
        "Pune",
        new Date("2020-11-12T13:30:00"),
        new Date("2020-11-12T16:30:00")
      ).getObject(),
      new Show(
        "Pulp Fiction",
        "IMAX Wadala",
        "Mumbai",
        new Date("2021-01-05T16:30:00"),
        new Date("2021-01-05T18:00:00")
      ).getObject(),
    ]);

  const app = bootstrap(databaseService, databaseName);

  app.listen();
})();
