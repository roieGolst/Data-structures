import { Memento } from "./Memento";

export class Caretaker<T> {
    private mementos: Memento<T>[];

    constructor() {
        this.mementos = new Array<Memento<T>>;
    }

    addMemento(memento: Memento<T>) {
        this.mementos.push(memento);
    }

    popMemento(): Memento<T> | undefined {
        return this.mementos.pop();
    }

    getMemento(index: number): Memento<T> | undefined {
        return this.mementos[index];
    }
}