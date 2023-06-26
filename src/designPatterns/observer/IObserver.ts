export interface IObserver {
    notify(context: string): void;
}