import { CREATED, OK } from "@shared/consts";
import { Response } from "express";

export class Http {
  constructor(protected res: Response) {}

  ok<T extends any>(data?: T) {
    return this.res.status(OK).json(data);
  }

  created<T extends any>(data?: T) {
    return this.res.status(CREATED).json(data);
  }
}
