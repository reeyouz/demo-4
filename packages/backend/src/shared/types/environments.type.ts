import { DEV, PROD, TEST } from "../consts";

export type Environment = typeof DEV | typeof TEST | typeof PROD;
