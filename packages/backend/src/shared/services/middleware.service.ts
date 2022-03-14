import { Service } from "@base/service";
import { AccessForbidden, UserAuthenticated } from "@features/user";
import { Either } from "@shared/types";
import { left, right } from "@shared/util";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ConfigService } from ".";
import { LoggerService } from "./logger.service";

export class MiddlewareService extends Service {
  constructor(
    loggerService: LoggerService,
    private configService: ConfigService
  ) {
    super(loggerService);
  }

  async authenticate(req: Request, res: Response, next: NextFunction) {
    const result = this.authenticateUser(req.headers.authorization);
    if (result.isRight()) {
      return next(result.value);
    }
    req.email = result.value.email;
    next();
  }

  authenticateUser(
    authorization?: string
  ): Either<UserAuthenticated, AccessForbidden> {
    const access_error = AccessForbidden.create();
    if (authorization === undefined) {
      return right(access_error);
    }
    const token = authorization.split(" ")[1];
    try {
      const verified = this.verifyToken(token);
      return left({
        _id: verified._id,
        email: verified.email,
      });
    } catch (error) {
      return right(access_error);
    }
  }

  verifyToken(token: string) {
    return verify(token, this.configService.JWT_TOKEN) as JwtPayload;
  }
}
