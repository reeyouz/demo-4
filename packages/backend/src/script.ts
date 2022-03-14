import "reflect-metadata";
import { configService } from "@shared/services";

declare global {
  namespace Express {
    interface Request {
      email: string;
    }
  }
}

if (!configService.isProd) {
  const { MONGO_DB_URI } = process.env;
  if (MONGO_DB_URI === undefined) {
    require("dotenv").config();
  }
}
