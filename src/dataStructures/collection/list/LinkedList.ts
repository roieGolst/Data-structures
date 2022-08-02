import { IList, ListItem } from "./IList";
import { Iterable, Iterator } from "../../iterator/Iterator";

class LinkedListItem<T> implements ListItem<T> {
    value: T;
    next?: LinkedListItem<T>

    constructor(value: T, next?: LinkedListItem<T>) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T> implements IList<T>, Iterable<T>{

    private head?: LinkedListItem<T>;
    private tail?: LinkedListItem<T>;

    isEmpty(): boolean {
        return this.head == undefined;
    }

    addFirst(item : T): void {
        if(!this.head) {
            this.head = new LinkedListItem<T>(item);
        }

        if(!this.tail) {
            this.tail = this.head;
            return;
        }

        const tempHead = this.head;

        this.head = new LinkedListItem<T>(item, tempHead);
    }

    first(): T {
        if(!this.head) {
            throw Error("No items on list");
        }
        return this.head.value;
    }

    get(index: number): T {
        let curentPostion = this.head;

        if(!curentPostion) {
            throw Error("No items on list");
        }

        let counter = 0;

        while(counter < index) {
            if(!curentPostion?.next) {
                throw Error("Invalid index");
            }

            curentPostion = curentPostion.next;
            counter++;
        }

        return curentPostion.value;
    }

    add(val: T): void {
        const item = new LinkedListItem<T>(val);

        if(!this.head) {
            this.head = item;
        }

        if(!this.tail) {
            this.tail = this.head;
            return;
        }

        this.tail.next = item;
        this.tail = item;

    }

    pop(): T {
        const temp = this.head?.value;

        if(!temp) {
            this.tail = this.head; 

            throw Error("List is empty");
        }

        this.head = this.head?.next;

        return temp;
    }

    last(): T {
        if(!this.head || !this.tail) {
            throw Error("No items on list");
        }

        return this.tail.value;
    }

    traverse(): T[] {
        let currentItem: LinkedListItem<T> | undefined = this.head;
        const elements: T[] = new Array();

        while(currentItem) {
            elements.push(currentItem.value);
            currentItem = currentItem.next
        }

        return elements;
    }

    iterator(): Iterator<T> {
        let curentPostion = this.head;

        return {
            next(): T {
                if(!curentPostion) {
                    throw Error("Out of bound");
                }

                const data = curentPostion.value;
                curentPostion = curentPostion.next;

                return data;
            }, 

            hasNext(): boolean {
                return curentPostion != undefined;
            },
        }
    }

    forEach(cb: (cb: any) => any): void {
        const iterator = this.iterator();

        while(iterator.hasNext()) {
            cb(iterator.next());
        }
    }
}


// const x = new LinkedList<number>();

// let iterator = x.iterator()

// while(iterator.hasNext()) {
//     const item = iterator.next();
//     console.log(item);
// }

// x.add(1);
// x.add(2);
// x.add(3);
// x.add(4);


