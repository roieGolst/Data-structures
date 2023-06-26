import { IObserver } from "./IObserver";

export interface IAuction {
    subscribe(observer: IObserver): void;
    unSubscribe(observer: IObserver): void;
    updatePrice(newPrice: number): void;
    getPrice(): number;
}