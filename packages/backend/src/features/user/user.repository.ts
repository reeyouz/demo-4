import { Repository } from "@base/repository";
import { LoggerService } from "@shared/services";
import { Either } from "@shared/types";
import { left, right } from "@shared/util";
import { Collection, Filter } from "mongodb";
import { AddUserError } from ".";
import { User } from "./user.model";

export class UserRepository extends Repository<User> {
  constructor(loggerService: LoggerService, collection: Collection<User>) {
    super(loggerService, collection);
  }

  async add(data: User): Promise<Either<undefined, AddUserError>> {
    const result = await this.collection.insertOne(data);
    if (result.acknowledged === false) {
      return right(AddUserError.create(data.email));
    }
    return left(undefined);
  }

  async find(filter: Filter<User>) {
    return this.collection.find(filter).toArray();
  }

  async findOne(filter: Filter<User>) {
    return this.collection.findOne(filter);
  }
}
