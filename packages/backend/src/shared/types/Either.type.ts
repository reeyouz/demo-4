import { Left } from "./Left.type";
import { Right } from "./Right.type";

export type Either<T, E> = Left<T, E> | Right<T, E>;
