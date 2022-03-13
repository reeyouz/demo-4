import { AppError } from "@base/error";
import { INTERNAL_SERVER_ERROR } from "..";

export class DatabaseConnectionError extends AppError {
  constructor(url: string) {
    super(`Failed to connect with database at ${url}!`, INTERNAL_SERVER_ERROR);
  }

  static create(url: string) {
    return new DatabaseConnectionError(url);
  }
}

export class DatabaseDisconnectionError extends AppError {
  constructor() {
    super("Failed to disconnect with database!", INTERNAL_SERVER_ERROR);
  }

  static create() {
    return new DatabaseDisconnectionError();
  }
}

export class DatabaseNotConnectedError extends AppError {
  constructor() {
    super("Database not connected!", INTERNAL_SERVER_ERROR);
  }

  static create() {
    return new DatabaseNotConnectedError();
  }
}
