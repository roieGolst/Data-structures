import { IStack } from "./IStack";
import { LinkedList } from "../list/LinkedList";
import { Iterator } from "../../iterator/Iterator";


export class Stack<T> implements IStack<T>{

    private linkedList = new LinkedList<T>();

    isEmpty(): boolean {
        return this.linkedList.isEmpty();
    }

    peek(): T {
        return this.linkedList.first();
    }

    push(item: T): void {
        return this.linkedList.addFirst(item);
    }

    pop(): T {
        return this.linkedList.pop();
    }

    iterator(): Iterator<T> {
        const stack = this;

        return {
            next(): T {
                return stack.pop();
            },

            hasNext(): boolean {
                return !stack.isEmpty();
            }
        }
    }
}

// const roieStack = new MyStack<number>();

// roieStack.push(10);
// roieStack.push(20);
// roieStack.push(30);
// roieStack.push(40);
// roieStack.push(50);
// roieStack.push(60);
// roieStack.push(70);
// roieStack.push(80);


// while(roieStack.hasNext()) {
//     console.log(roieStack.next());
// }

// console.log(roieStack);