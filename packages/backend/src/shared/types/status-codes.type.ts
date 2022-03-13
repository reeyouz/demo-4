import {
  BAD_REQUEST,
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} from "..";

export type StatusCodes =
  | typeof OK
  | typeof CREATED
  | typeof BAD_REQUEST
  | typeof UNAUTHORIZED
  | typeof FORBIDDEN
  | typeof NOT_FOUND
  | typeof INTERNAL_SERVER_ERROR;
