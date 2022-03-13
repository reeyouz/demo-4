import { Left } from "./Left.type";

export class Right<T, E> {
  constructor(public readonly value: E) {}

  isLeft(): this is Left<T, E> {
    return false;
  }

  isRight(): this is Right<T, E> {
    return true;
  }
}
