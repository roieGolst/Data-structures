export interface Iterable<T> {
    iterator(): Iterator<T>
}

export interface Iterator<T> {
    next(): T;
    hasNext(): boolean;   
}

