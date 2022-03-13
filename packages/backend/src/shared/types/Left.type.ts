import { Right } from "./Right.type";

export class Left<T, E> {
  constructor(public readonly value: T) {}

  isLeft(): this is Left<T, E> {
    return true;
  }

  isRight(): this is Right<T, E> {
    return false;
  }
}
