import { IObserver } from "./IObserver";

export class AuctionMember implements IObserver {
    notify(context: string): void {
        console.log(context);
    }
}