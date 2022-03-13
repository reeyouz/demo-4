import { AppError as IAppError, StatusCodes } from "@shared/types";

export abstract class AppError extends Error implements IAppError {
  title: string;
  [key: string]: any;

  constructor(public detail: string, public status_code: StatusCodes) {
    super(detail);
    this.title = new.target.name;
  }
}
