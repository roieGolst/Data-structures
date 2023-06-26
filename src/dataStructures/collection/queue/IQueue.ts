import { Iterable } from "../../../designPatterns/iterator/Iterator";

export interface IQueue<E> extends Iterable<E>{
    isEmpty(): boolean;
    add(item: E): void;
    poll(): E;
    peek(): E;   
}