import { hashCode } from "../../../utils/hashCode";
import { LinkedList } from "../list/LinkedList";
import { IMap } from "./IMap";

function compareHashNode(itemA: HashNode<any>, itemB: HashNode<any>): number {
    if(itemA.getValue() == itemB.getValue()) {
        return 0;
    }
    else if(itemA.getValue() > itemB.getValue) {
        return 1;
    }

    return -1;
}

class HashNode<T> {
    private hash: number;
    private key: string;
    private value: T;

    constructor(hashNumber: number, key:string, value: T) {
        this.hash = hashNumber;
        this.value = value;
        this.key = key;
    }

    getHash(): number { return this.hash; }
    getValue(): T { return this.value; }
    getKye(): string { return this.key; }
    toString(): string { return `${this.key} = ${this.value}` }
}

export class HashMap<K ,V> implements IMap<K, V> {
    private buckets : LinkedList<HashNode<V>>[];

    constructor(size: number = 16) {
        this.buckets = new Array(size);
    }

    get(key: K): V | undefined{
        const { element } = this.getElement(key);

        return element.getValue();
    }

    put(key: K, value: V): void {
        if(!(typeof key === "string")) {
            throw Error("Key as must to be string to get hash code");
        }

        const index = this.getIndex(key);
        

        if(!this.buckets[index]) {
            this.buckets[index] = new LinkedList<HashNode<V>>(compareHashNode);
        }

        const node = new HashNode(hashCode(key), key, value);

        this.buckets[index].add(node);
    }

    remove(key: K ): V {
        if(typeof key !== "string") {
            throw Error("Key as must to be string to get hash code");
        }

        const { element , index } = this.getElement(key);

        this.buckets[index].remove(element);
        
        return element.getValue()
    }

    private getIndex(key: K): number {

        if(typeof key !== "string") {
            throw Error("Key as must to be string to get hash code");
        }

        return  hashCode(key) & (this.buckets.length - 1);
    }

    private getElement(key: K): {element: HashNode<V>, index: number}{
        if(typeof key !== "string") {
            throw Error("Key as must to be string to get hash code");
        }

        const index = this.getIndex(key)
        
        
        if(!this.buckets[index]) {
            throw Error("Item is not declear");
        }

        const hashCompare = (item: HashNode<V>) => item.getHash() == hashCode(key);  
        
        const itemIndex = this.buckets[index].indexOf(hashCompare);

        
        if(itemIndex < 0) {
            throw Error("Index of item can't be less then 0");
        }

        return {element: this.buckets[index].get(itemIndex), index: index}
    }
}
//********Tests********
// let myMap: IMap<string, Person> = new HashMap<string, Person>();

// myMap.put("roie", new Person(20));
// myMap.put("yoni", new Person(30));
// myMap.put("yakir", new Person(27));
// myMap.put("sari", new Person(59));
// myMap.put("yehial", new Person(61));

// console.log(myMap.get("sari"));
