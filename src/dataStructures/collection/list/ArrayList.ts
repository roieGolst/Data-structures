import { IList } from "./IList";
import { Iterable, Iterator } from "../../iterator/Iterator";

export class ArrayList<T> implements IList<T>, Iterable<T>{
    private array: T[];
    private arrayCpacity: number;
    private index: number = 0;

    constructor(arrayLength: number = 10, ) {
        this.arrayCpacity = arrayLength
        this.array = new Array(arrayLength);
    }

    add(val: T): void {
        if(this.array.length == this.index) {
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

    first(): T {
        return this.array[0];
    }

    last(): T {
        let length: number = this.array.length;

        return this.array[length -1];
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
    
}

let Iarray = new ArrayList<number>(8);

Iarray.add(1);
Iarray.add(2);
Iarray.add(3);
Iarray.add(4);
Iarray.add(5);
Iarray.add(6);
Iarray.add(7);
Iarray.add(8);
Iarray.remove(3);
Iarray.add(10);


let iterator = Iarray.iterator();

while(iterator.hasNext()) {
    console.log([iterator.next()]);
}