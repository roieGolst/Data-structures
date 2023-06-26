import { Memento } from "./Memento";

export interface INotepad {
    write(context: string): void;
    read(): string;
    createMemento(): Memento<string>;
    restoreFromMemento(memento: Memento<string>): void;
}