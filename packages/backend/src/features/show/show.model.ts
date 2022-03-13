import { plainToInstance } from "class-transformer";
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { ObjectId } from "mongodb";
import { Show as IShow } from "./show.type";

export class Show implements IShow {
  @IsMongoId()
  _id: string;

  @MinLength(1)
  @MaxLength(100)
  @IsString()
  movie_name: string;

  @MinLength(1)
  @MaxLength(100)
  @IsString()
  theatre_name: string;

  @MinLength(1)
  @MaxLength(100)
  @IsString()
  city_name: string;

  @IsDateString()
  start_time: Date;

  @IsDateString()
  end_time: Date;

  @Min(10)
  @Max(120)
  @IsNumber()
  seats: Number;

  constructor(
    movie: string,
    theatre: string,
    city: string,
    start: Date,
    end: Date,
    seats = 100
  ) {
    this.movie_name = movie;
    this.theatre_name = theatre;
    this.city_name = city;
    this.start_time = start;
    this.end_time = end;
    this.seats = seats;
    this._id = new ObjectId().toString();
  }

  getObject(): IShow {
    return {
      _id: this._id,
      city_name: this.city_name,
      theatre_name: this.theatre_name,
      movie_name: this.movie_name,
      start_time: this.start_time,
      end_time: this.end_time,
      seats: this.seats,
    };
  }

  static getInstance(data: any) {
    return plainToInstance(Show, data);
  }
}
