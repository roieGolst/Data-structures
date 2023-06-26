import { Iterable } from "../../../designPatterns/iterator/Iterator";

export interface IStack<T> extends Iterable<T> {
    isEmpty(): boolean;
    push(item: T): void;
    pop(): T;
    peek(): T;
}