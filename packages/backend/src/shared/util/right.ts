import { Either, Right } from "@shared/types";

export function right<T, E>(value: E): Either<T, E> {
  return new Right(value);
}
