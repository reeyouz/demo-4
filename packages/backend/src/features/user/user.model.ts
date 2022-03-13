import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { User as IUser } from "./user.type";

export class User implements IUser {
  @IsMongoId()
  _id: string;

  @MinLength(3)
  @MaxLength(65)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  @IsDate()
  createdOn: Date;

  static getInstance(data: any) {
    return plainToInstance(User, data);
  }
}
