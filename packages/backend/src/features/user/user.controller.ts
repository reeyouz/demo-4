import { Controller } from "@base/controller";
import { LoggerService } from "@shared/services";
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController extends Controller {
  path: string;

  constructor(
    private userService: UserService,
    loggerService: LoggerService,
    path = "/user"
  ) {
    super(loggerService);
    this.path = path;
    this.router.post("/register", this.register.bind(this));
    this.router.post("/login", this.login.bind(this));
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.createUser(req.body);
    if (result.isLeft()) {
      return this.http.created(result.value);
    }
    next(result.value);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.loginUser(req.body);
    if (result.isLeft()) {
      return this.http.ok(result.value);
    }
    next(result.value);
  }
}
