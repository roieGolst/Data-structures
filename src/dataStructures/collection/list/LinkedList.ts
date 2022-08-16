import { IList, ListItem } from "./IList";
import { Iterable, Iterator } from "../../iterator/Iterator";
import { ICompareable } from "../../compare/ICompareable";
import { Person } from "../../../tail";

class LinkedListItem<T> implements ListItem<T> {
    value: T;
    next?: LinkedListItem<T>

    constructor(value: T, next?: LinkedListItem<T>) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T extends ICompareable<T>> implements IList<T>, Iterable<T>{

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

    remove(item: T): boolean {
        let previous: LinkedListItem<T>;
        let currentItem = this.head;

        while(currentItem) {
            if(currentItem.value.compere(item) == 0) {
                if(currentItem == this.head) {
                    return this.removeFirst();
                }

                if(!currentItem.next) {
                    this.tail = previous!;
                    previous!.next = undefined
                }

                previous!.next = currentItem.next;

                return true;

            }

            previous = currentItem;
            currentItem = currentItem.next;
        }

        throw Error("***Item not defind***");
    }

    removeFirst(): boolean {
        if(!this.head) {
            console.error("***Unable to remove from empty list***");

            return false;
        }

        if(!this.head?.next) {
            this.head = undefined;
            this.tail = this.head;

            return true;
        }

        this.head = this.head.next;

        return true;
    }

    removeLast(): boolean {
        if(!this.head) {
            console.error("***Unable to remove from empty list***");

            return false;
        }

        let currentItem = this.head;

        while(currentItem) {
            if(currentItem == this.tail) {
                this.head = undefined;
                this.tail = undefined;

                return true;
            }

            if(currentItem.next == this.tail) {
                this.tail = currentItem;
                currentItem.next = undefined;

                return true;
            }
        }

        throw Error("***Something worng***");
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


// const x = new LinkedList<Person>();
// let p1 = new Person(10)
// let p2 = new Person(20)
// let p3 = new Person(30)
// let p4 = new Person(40)


// x.add(p1);
// x.add(p2);
// x.add(p3);
// x.add(p4);

// let iterator = x.iterator();

// while(iterator.hasNext()) {
//     const item = iterator.next();
//     console.log(item);
// }

// x.removeLast();

// console.log(x.traverse());
// console.log("First" ,x.first());
// console.log("Last" ,x.last());


