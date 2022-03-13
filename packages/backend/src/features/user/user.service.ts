import { Service } from "@base/service";
import { LoggerService } from "@shared/services";
import { Either } from "@shared/types";
import { left, right } from "@shared/util";
import { validateSync } from "class-validator";
import { ObjectId } from "mongodb";
import { AddUserError } from ".";
import { InvalidUserBody } from "./user.errors";
import { User } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService extends Service {
  constructor(
    loggerService: LoggerService,
    protected userRepository: UserRepository
  ) {
    super(loggerService);
  }

  async createUser(
    body: any
  ): Promise<Either<undefined, InvalidUserBody | AddUserError>> {
    const user = User.getInstance(body);
    user.createdOn = new Date();
    user._id = new ObjectId().toString();
    this.logger.debug(user);

    // TODO: Break apart validation into its own function
    const errors = validateSync(user, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      const error = InvalidUserBody.create();
      error.errors = errors;
      return right(error);
    }

    // TODO: Find duplicate email

    const result = await this.userRepository.addUser(user);
    if (result.isRight()) {
      this.logger.error(result.value);
      return right(result.value);
    }

    return left(result.value);
  }
}
