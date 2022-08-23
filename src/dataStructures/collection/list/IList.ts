export interface IList<E> {
    add(val: E): void;
    remove(item: E | number): void;
    get(index: number): E;  
    first(): E;
    last(): E;
    indexOf(item: any): number;
}

export interface ListItem<E> {
    value: E;
    next?: ListItem<E>;
}