import { AppError } from "@base/error";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@shared/consts";

export class InvalidUserBody extends AppError {
  constructor() {
    super("Incorrect request body for creating a new user!", BAD_REQUEST);
  }

  static create() {
    return new InvalidUserBody();
  }
}

export class AddUserError extends AppError {
  constructor(email: string) {
    super(`Failed to add user with email ${email}!`, INTERNAL_SERVER_ERROR);
  }

  static create(email: string) {
    return new AddUserError(email);
  }
}
