import { Repository } from "@base/repository";
import { LoggerService } from "@shared/services";
import { Collection, Filter, UpdateFilter } from "mongodb";
import { Show } from "./show.model";

export class ShowRepository extends Repository<Show> {
  constructor(loggerService: LoggerService, collection: Collection<Show>) {
    super(loggerService, collection);
  }

  find(filter: Filter<Show>) {
    return this.collection.find(filter).toArray();
  }

  findOne(filter: Filter<Show>) {
    return this.collection.findOne(filter);
  }

  update(filter: Filter<Show>, update: UpdateFilter<Show>) {
    return this.collection.findOneAndUpdate(filter, update);
  }
}
