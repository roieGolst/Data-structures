import { INotepad } from "./INotepad";
import { Memento } from "./Memento";

export class Notepad implements INotepad {
    private text: string = "";
    private fileVersion: Memento<string>[];

    constructor() {
        this.fileVersion.push(new Memento(this.text));
    }

    write(context: string): void {
        this.text = context;
    }

    read(): string {
        return this.text;
    }
    
    createMemento(): Memento<string> {
        return new Memento(this.text);
    }

    restoreFromMemento(memento: Memento<string>): void {
        this.text = memento.getState();
    }
}