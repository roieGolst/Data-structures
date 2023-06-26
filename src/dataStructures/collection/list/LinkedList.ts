import { IList } from "./IList";
import { Compareable, CompareItem, EqualsFunction } from "../../../common/ICompareable";
import { Iterable, Iterator } from "../../../designPatterns/iterator/Iterator";

class LinkedListItem<T> {
    value: T;
    next?: LinkedListItem<T>;
    

    constructor(value: T, next?: LinkedListItem<T>) {
        this.value = value;
        this.next = next;
    }
}

export class LinkedList<T> implements IList<T>, Iterable<T>{

    private head?: LinkedListItem<T>;
    private tail?: LinkedListItem<T>;
    private compare: Compareable<T>;

    constructor(compareFun?: CompareItem) {
        this.compare = new Compareable(compareFun)
    }

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
        if(index < 0) {
            throw Error(`Invalid index`);
        }
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
        let previous = undefined;
        let currentItem = this.head;

        while(currentItem) {
            if(this.compare.equals(currentItem.value, item)) {
                if(currentItem == this.head) {
                    return this.removeFirst();
                }

                if(!currentItem.next) {
                    if(!previous) {
                        throw Error("Previous is Undefined");
                    }

                    this.tail = previous;
                    previous.next = undefined;

                    return true;
                }

                if(!previous) {
                    throw Error("Previous is Undefined");
                }

                previous.next = currentItem.next;

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

            if(currentItem.next) {
                currentItem = currentItem.next;
            }
        }

        throw Error("***Something worng***");
    }

    contains(cb: EqualsFunction<T>): boolean {
        let iterator = this.iterator();

        while(iterator.hasNext()) {
            let currentItem = iterator.next();

            if(cb(currentItem)) {
                return true;
            }

        }

        return false;
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

    indexOf(cb: EqualsFunction<T>): number {
        let iterator = this.iterator();
        let cunnter = 0;

        while(iterator.hasNext()) {
            const currentItem = iterator.next();

            if(cb(currentItem)) {
                return cunnter;
            }

            cunnter++;
        }

        return -1;
    }

    traverse(): T[] {
        let iterator = this.iterator()
        const elements: T[] = new Array();

        while(iterator.hasNext()) {
            const currentItem = iterator.next()
            elements.push(currentItem);
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

//**********Test**********
// const x: IList<Person> = new LinkedList<Person>();
// let p1 = new Person(10)
// let p2 = new Person(20)
// let p3 = new Person(30)
// let p4 = new Person(40)


// x.add(p1);
// x.add(p2);
// x.add(p3);
// x.add(p4);


// console.log(x.contains((item: Person) => item.age == p4.age))
// let iterator = x.iterator();

// while(iterator.hasNext()) {
//     const item = iterator.next();
//     console.log(item);
// }

// x.removeLast();

// console.log(x.search(p3));
// console.log("First" ,x.first());
// console.log("Last" ,x.last());
