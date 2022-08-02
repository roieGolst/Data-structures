import { Iterable } from "../../iterator/Iterator";

export interface ITree<T> extends Iterable<T>{
    insert(item: T): void;
    search(item: T): TreeNode<T> | undefined;
    delete(item: T): void;
    contains(item: T): boolean;
}

export interface TreeNode<T> {
    value: T;
    children?: TreeNode<T>[];
}

