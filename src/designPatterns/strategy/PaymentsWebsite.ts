import { Costumer } from "./Costumer";
import { IPayment } from "./IPayment";

interface PaymentsWessite {
    setPaymentStrategy(strategy: IPayment): void;
    debitUser(userId: string, price: number): void;
    creditUser(userId: string, price: number): void;
    addNewUser(id: string, name: string, bankBalance: number): void;
}

class RoieWebsite implements PaymentsWessite {
    private paymentStragey: IPayment;
    private users: Map<string, Costumer> = new Map();

    setPaymentStrategy(strategy: IPayment): void {
        this.paymentStragey = strategy;
    }

    addNewUser(id: string, name: string, bankBalance: number): void {
        this.users.set(id ,new Costumer(name, bankBalance));
    }

    debitUser(userId: string, price: number) {
        if(!this.paymentStragey) throw new Error("Must set payment strategy before useing it");

        const costumer = this.users.get(userId);

        if(!costumer) {
            return console.error(`User: ${userId} not defined`);
        }

        this.paymentStragey.debit(costumer, price);
    }

    creditUser(userId: string, price: number): void {
        if(!this.paymentStragey) throw new Error("Must set payment strategy before useing it");

        const costumer = this.users.get(userId);

        if(!costumer) {
            return console.error(`User: ${userId} not defined`);
        }

        this.paymentStragey.credit(costumer, price);
    }
}

