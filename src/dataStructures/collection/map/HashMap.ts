import { Person } from "../../../tail";
import { hashCode } from "../../utils/hashCode";
import { LinkedList } from "../list/LinkedList";
import { IMap } from "./IMap";


function hashNodeCompare(itemA: HashNode<any>, itemB: number): number {
    if(itemA.getHash() == itemB) {
        return 0;
    }
    else if(itemA.getHash() > itemB) {
        return 1;
    }

    return -1;
}

class HashNode<T> {
    private hash: number;
    private value: T;

    constructor(hashNumber: number, value: T) {
        this.hash = hashNumber;
        this.value = value;
    }

    getHash(): number {
        return this.hash;
    }

    getValue() {
        return this.value;
    }
}

export class HashMap<K ,V> implements IMap<K, V> {
    private buckets : LinkedList<HashNode<V>>[];

    constructor(size: number = 16) {
        this.buckets = new Array(size);
    }

    get(key: K):any  {

        if(!(typeof key === "string")) {
            throw Error("Key as must to be string to get hash code");
        }

        let hashNumber = hashCode(key);
        let index = hashNumber & (this.buckets.length - 1);

        if(!this.buckets[index]) {
            throw Error("Item not found");
        }

        let returnedValue = this.buckets[index].search(hashNumber);

        return returnedValue;
    }

    put(key: K, value: V): void {
        if(!(typeof key === "string")) {
            throw Error("Key as must to be string to get hash code");
        }

        let hashNumber = hashCode(key);
        let index = hashNumber & (this.buckets.length - 1);
        

        if(!this.buckets[index]) {
            this.buckets[index] = new LinkedList<HashNode<V>>(hashNodeCompare);
        }

        let node = new HashNode(hashNumber, value);

        this.buckets[index].add(node);
    }
    
}
//********Tests********
// let myMap: IMap<string, Person> = new HashMap<string, Person>();

// myMap.put("roie", new Person(20));
// myMap.put("yoni", new Person(30));
// myMap.put("yakir", new Person(27));
// myMap.put("sari", new Person(59));
// myMap.put("yehial", new Person(61));

// console.log(myMap);