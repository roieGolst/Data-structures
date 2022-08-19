export interface IMap<K, V> {
    get(key: K): any;
    put(key: K, value: V): void;
}