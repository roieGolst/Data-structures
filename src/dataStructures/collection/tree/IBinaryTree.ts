import { Iterable } from "../../iterator/Iterator";
import { ICompareable } from "../../compare/ICompareable";

export interface IBinaryTree<T extends ICompareable<T>> extends Iterable<T>{
    insert(item: T): void;
    search(item: T): IBinaryNode<T> | undefined;
    delete(item: T): void;
    contains(item: T): boolean;
}

export interface IBinaryNode<T extends ICompareable<T>> {
    value: T;
    left?: IBinaryNode<T>;
    right?: IBinaryNode<T>;
}