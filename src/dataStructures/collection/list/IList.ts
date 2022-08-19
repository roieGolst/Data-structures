export interface IList<E> {
    add(val: E): void;
    remove(item: E | number): void;
    get(index: number): E;  
    first(): E;
    last(): E;
    search(item: any): E;
}

export interface ListItem<E> {
    value: E;
}