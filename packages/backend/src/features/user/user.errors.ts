import { AppError } from "@base/error";
import {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} from "@shared/consts";

export class InvalidUserBody extends AppError {
  constructor() {
    super("Incorrect request body for creating a new user!", BAD_REQUEST);
  }

  static create() {
    return new InvalidUserBody();
  }
}

export class InvalidCredentials extends AppError {
  constructor() {
    super("Invalid Credentials!", UNAUTHORIZED);
  }

  static create() {
    return new InvalidCredentials();
  }
}

export class AccessForbidden extends AppError {
  constructor() {
    super("You do not have access to this resource!", FORBIDDEN);
  }

  static create() {
    return new AccessForbidden();
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

export class DuplicateUser extends AppError {
  constructor(email: string) {
    super(`Existing user with email ${email} found!`, CONFLICT);
  }

  static create(email: string) {
    return new DuplicateUser(email);
  }
}

export class UserNotFound extends AppError {
  constructor(email: string) {
    super(`User with email ${email} not found!`, CONFLICT);
  }

  static create(email: string) {
    return new UserNotFound(email);
  }
}
