import { validateSync } from "class-validator";
import { ObjectId } from "mongodb";
import { hash, compare } from "bcryptjs";
import jwt, { JwtPayload, sign, verify } from "jsonwebtoken";
import { Service } from "@base/service";
import { ConfigService, LoggerService } from "@shared/services";
import { Either } from "@shared/types";
import { left, right } from "@shared/util";
import {
  AccessForbidden,
  AddUserError,
  Credentials,
  DuplicateUser,
  UserNotFound,
} from ".";
import { InvalidCredentials, InvalidUserBody } from "./user.errors";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";
import { UserCreated, UserLogin, IUser, UserAuthenticated } from "./user.type";

export class UserService extends Service {
  constructor(
    loggerService: LoggerService,
    private userRepository: UserRepository,
    private configService: ConfigService
  ) {
    super(loggerService);
  }

  async createUser(
    body: any
  ): Promise<
    Either<UserCreated, InvalidUserBody | AddUserError | DuplicateUser>
  > {
    const user = User.getInstance(body);
    user.createdOn = new Date();
    user._id = new ObjectId().toString();

    const errors = validateSync(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      const error = InvalidUserBody.create();
      error.errors = errors;
      return right(error);
    }

    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser.isLeft()) {
      return right(DuplicateUser.create(user.email));
    }

    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
    this.logger.debug(user);

    const result = await this.userRepository.add(user);
    if (result.isRight()) {
      this.logger.error(result.value);
      return right(result.value);
    }

    const token = this.generateToken(user._id, user.email);

    return left({ token });
  }

  async loginUser(body: any): Promise<Either<UserLogin, InvalidCredentials>> {
    const credentials = Credentials.getInstance(body);
    const error = InvalidCredentials.create();

    const errors = validateSync(credentials, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      error.errors = errors;
      return right(error);
    }

    const user = await this.findUserByEmail(credentials.email);
    if (user.isRight()) {
      error.message = DuplicateUser.create(credentials.email).detail; // For logging
      return right(error);
    }

    const doPasswordsMatch = await this.comparePassword(
      credentials.password,
      user.value.password
    );
    if (doPasswordsMatch === false) {
      error.message = "Password incorrect!";
      return right(error);
    }

    const token = this.generateToken(user.value._id, user.value.email);

    return left({
      _id: user.value._id,
      name: user.value.name,
      email: user.value.email,
      createdOn: user.value.createdOn,
      token,
    });
  }

  async findUserByEmail(email: string): Promise<Either<User, UserNotFound>> {
    const user = await this.userRepository.findOne({ email });
    if (user === null) {
      return right(UserNotFound.create(email));
    }
    this.logger.debug(`Found user with email ${email}`);
    return left(user);
  }

  generateToken(_id: string, email: string) {
    return sign({ _id, email }, this.configService.JWT_TOKEN, {
      expiresIn: "1h",
    });
  }

  comparePassword(user_provided: string, hashed: string) {
    return compare(user_provided, hashed);
  }
}
