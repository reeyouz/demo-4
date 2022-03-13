import { Collection, MongoClient } from "mongodb";
import { Service } from "@base/service";
import { ConfigService, LoggerService } from "@shared/services";
import { left, right } from "@shared/util";
import { DatabaseConnectionError } from "./database.errors";
import { Either } from "@shared/types";
import { DatabaseDisconnectionError, DatabaseNotConnectedError } from ".";

export class DatabaseService extends Service {
  private _client: MongoClient | undefined = undefined;
  isConnected = false;

  get client() {
    return this._client;
  }

  constructor(
    loggerService: LoggerService,
    private configService: ConfigService
  ) {
    super(loggerService);
  }

  async connect(): Promise<Either<undefined, DatabaseConnectionError>> {
    this.logger.info(`Connecting at ${this.configService.MONGO_URI}`);
    if (this.isConnected === false) {
      if (this._client === undefined) {
        this._client = new MongoClient(this.configService.MONGO_URI);
      }
      return this._client
        .connect()
        .then(() => {
          this.isConnected = true;
          return left<undefined, DatabaseConnectionError>(undefined);
        })
        .catch((err) => {
          const error = DatabaseConnectionError.create(
            this.configService.MONGO_URI
          );
          error.message = err.message;
          this.isConnected = false;
          return right(error);
        });
    }
    this.isConnected = true;
    return left(undefined);
  }

  async disconnect(): Promise<Either<undefined, DatabaseDisconnectionError>> {
    this.logger.warn("Disconnecting from database");
    if (this.isConnected === true && this._client !== undefined) {
      return this._client
        .close()
        .then(() => {
          this.isConnected = false;
          return left<undefined, DatabaseDisconnectionError>(undefined);
        })
        .catch((err) => {
          const error = DatabaseDisconnectionError.create();
          error.message = err.message;
          this.isConnected = true;
          return right(error);
        });
    }
    this.isConnected = false;
    return left(undefined);
  }

  getCollection<T>(
    dbName: string,
    collectionName: string
  ): Either<Collection<T>, DatabaseNotConnectedError> {
    if (this.isConnected === false) {
      return right(DatabaseNotConnectedError.create());
    }
    const collection = this._client!.db(dbName).collection<T>(collectionName);
    return left(collection);
  }
}
