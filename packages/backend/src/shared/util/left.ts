import { Either, Left } from "@shared/types";

export function left<T, E>(value: T): Either<T, E> {
  return new Left(value);
}
