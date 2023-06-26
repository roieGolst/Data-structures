import { IList } from "./IList";``
import { Compareable, CompareItem } from "../../../common/ICompareable";
import { Iterable, Iterator } from "../../../designPatterns/iterator/Iterator";

export class ArrayList<T> implements IList<T>, Iterable<T>{
    private array: T[];
    private arrayCpacity: number;
    private index: number = 0;
    private compare: Compareable<T>;

    constructor(arrayLength: number = 10, compareFun?: CompareItem) {
        this.arrayCpacity = arrayLength
        this.array = new Array(arrayLength);
        this.compare = new Compareable(compareFun);
    }

    add(val: T): void {
        if(this.size() == this.index) {
            const newArray = new Array(this.array.length + this.arrayCpacity);

            for(let i in this.array) {
                newArray[i] = this.array[i];
            }

            this.array = newArray;

        }

        this.array[this.index++] = val;
    }

    remove(index: number): void {
        if(index < 0 || index >= this.array.length) {
            throw Error("Invalid index");
        }

        for(let i = index; i < this.array.length; i++) {
            this.array[i] = this.array[i + 1];
        }

        this.index -= 1;
    }

    get(index: number): T {
        if(index < 0 || index >= this.array.length) {
            throw Error("Invalid index");
        }

        return this.array[index];
    }

    indexOf(item: any): number  {
        let iterator = this.iterator();
        let counter = 0;

        while(iterator.hasNext()) {
            if(this.compare.equals(iterator.next(), item)) {
                return counter;
            }

            counter++;
        }

        return -1;
    }

    first(): T {
        if(!this.array[0]) {
            throw Error("List is empty");
        }

        return this.array[0];
    }

    last(): T {
        return this.array[this.size() -1];
    }

    size(): number {
        return this.array.length;
    }
    
    iterator(): Iterator<T> {
        let index: number = 0;
        let array = this.array;

        return {
            hasNext(): boolean {
                return index < array.length
            },

            next(): T {
                return array[index++];
            }
        }
    }

    forEach(cb: (cb: any) => any): void {
        let iterator = this.iterator();

        while(iterator.hasNext()) {
            cb(iterator.next());
        }

        return;
    }
    
}

// ********Tests********
// type x = number | undefined;

// let iArray = new ArrayList<x>();

// iArray.add(1);
// iArray.add(2);
// iArray.add(3);


// let iterator = iArray.iterator();

// while(iterator.hasNext()) {77
//     iArray.remove(0);
//     iArray.remove(0);
//     iArray.remove(0);
//     console.log(iterator.next());
// }

// console.log(Iarray.search(4));