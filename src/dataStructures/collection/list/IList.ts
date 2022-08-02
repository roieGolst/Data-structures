export interface IList<E> {
    add(val: E): void;
    get(index: number): E;  
    first(): E;
    last(): E;
}

export interface ListItem<E> {
    value: E;
}