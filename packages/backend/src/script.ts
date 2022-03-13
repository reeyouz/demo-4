import "reflect-metadata";
import { configService } from "@shared/services";

if (!configService.isProd) {
  const { MONGO_DB_URI } = process.env;
  if (MONGO_DB_URI === undefined) {
    require("dotenv").config();
  }
}
