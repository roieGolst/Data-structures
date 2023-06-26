import { Costumer } from "./Costumer";

export interface IPayment {
    debit(costumer: Costumer, price: number): void;
    credit(costumer: Costumer, price: number): void;
}
