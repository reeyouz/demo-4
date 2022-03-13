import { StatusCodes } from ".";

export interface AppError {
  title: string;
  detail: string;
  status_code: StatusCodes;
  [key: string]: any;
}
