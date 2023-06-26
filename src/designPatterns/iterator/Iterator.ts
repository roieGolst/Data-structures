export interface Iterable<T> {
    iterator(): Iterator<T>
    forEach(cb: (cb: any) => any): void;
}

export interface Iterator<T> {
    next(): T;
    hasNext(): boolean;  
}

