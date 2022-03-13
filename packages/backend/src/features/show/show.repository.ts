import { Repository } from "@base/repository";
import { LoggerService } from "@shared/services";
import { Collection, Filter } from "mongodb";
import { Show } from "./show.model";

export class ShowRepository extends Repository<Show> {
  constructor(loggerService: LoggerService, collection: Collection<Show>) {
    super(loggerService, collection);
  }

  find(filter: Filter<Show>) {
    return this.collection.find(filter).toArray();
  }
}
