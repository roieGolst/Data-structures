import { IAuction } from "./IAuction";
import { IObserver } from "./IObserver";

export class Auction implements IAuction {

    private observers: IObserver[];
    private price: number = 0;

    subscribe(observer: IObserver): void {
        const isAlreadyExists = this.observers.includes(observer);

        if(isAlreadyExists) {
            return console.error("This observer already exits");
        }

        this.observers.push(observer);
    }

    unSubscribe(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);

        if(observerIndex < 0) {
            return console.error("No such observer exists.");
        }

        this.observers.splice(observerIndex, 1);
    }

    updatePrice(newPrice: number): void {
        if(newPrice < this.price) {
            return console.error("The New price can't be lower than the current price")
        }

        this.price = newPrice;
        return this.notifyObservers(`Price updated: ${this.price}`);
    }

    getPrice(): number {
        return this.price;
    }

    private notifyObservers(context: string): void {
        this.observers.forEach((observer: IObserver) => {
            observer.notify(context);
        })
    }
}

