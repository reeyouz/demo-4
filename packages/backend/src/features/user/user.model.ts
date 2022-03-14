import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { plainToInstance } from "class-transformer";
import { IUser } from "./user.type";

export class Credentials implements Pick<IUser, "email" | "password"> {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  static getInstance(data: any) {
    return plainToInstance(Credentials, data);
  }
}

export class User extends Credentials implements IUser {
  @IsMongoId()
  _id: string;

  @MinLength(3)
  @MaxLength(65)
  @IsString()
  name: string;

  @IsDate()
  createdOn: Date;

  static getInstance(data: any) {
    return plainToInstance(User, data);
  }
}
