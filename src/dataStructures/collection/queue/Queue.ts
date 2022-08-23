import { IQueue } from "../queue/IQueue";
import { LinkedList } from "../list/LinkedList";

export class Queue<E> implements IQueue<E> {

    private linkedList = new LinkedList<E>()

    isEmpty(): boolean {
        return this.linkedList.isEmpty();
    }

    add(item: E): void {
        this.linkedList.add(item);
    }
    poll(): E {
        return this.linkedList.pop();
    }
    peek(): E {
        return this.linkedList.first();
    }

    iterator() {
        let queue = this;

        return {
            hasNext(): boolean {
                return !queue.isEmpty();
            },

            next(): E {
                return queue.poll();
            }
        }
    }

    forEach(cb: (cb: any) => any): void {
        this.linkedList.forEach(cb);
    }
}