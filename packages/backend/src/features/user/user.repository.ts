import { Repository } from "@base/repository";
import { LoggerService } from "@shared/services";
import { Either } from "@shared/types";
import { left, right } from "@shared/util";
import { Collection } from "mongodb";
import { AddUserError } from ".";
import { User } from "./user.model";

export class UserRepository extends Repository<User> {
  constructor(loggerService: LoggerService, collection: Collection<User>) {
    super(loggerService, collection);
  }

  async addUser(data: User): Promise<Either<undefined, AddUserError>> {
    const result = await this.collection.insertOne(data);
    if (result.acknowledged === false) {
      return right(AddUserError.create(data.email));
    }
    return left(undefined);
  }
}
