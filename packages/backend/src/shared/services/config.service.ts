import { DEV, TEST, PROD, Environment } from "..";

export class ConfigService {
  private _NODE_ENV: Environment;
  private _APP_PORT: number;
  private _isProd: boolean;
  private _isTest: boolean;

  get NODE_ENV() {
    return this._NODE_ENV;
  }

  get APP_PORT() {
    return this._APP_PORT;
  }

  get MONGO_URI() {
    return process.env.MONGO_DB_URI!;
  }

  get JWT_TOKEN() {
    return process.env.JWT_TOKEN!;
  }

  get isProd() {
    return this._isProd;
  }

  get isTest() {
    return this._isTest;
  }

  constructor() {
    this._NODE_ENV = this.getEnvironment();
    this._APP_PORT = this.getAppPort();
    this._isProd = this._NODE_ENV === PROD;
    this._isTest = this._NODE_ENV === TEST;
  }

  getEnvironment() {
    let { NODE_ENV } = process.env;
    NODE_ENV = NODE_ENV
      ? [DEV, TEST, PROD].includes(NODE_ENV)
        ? NODE_ENV
        : DEV
      : DEV;
    return NODE_ENV as Environment;
  }

  getAppPort() {
    let { PORT } = process.env;
    if (PORT === undefined || /^{0-9}{3,4}$/.test(PORT)) {
      PORT = "3000";
    }
    return Number(PORT);
  }
}
