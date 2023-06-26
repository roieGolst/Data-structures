import { Costumer } from "../Costumer";
import { IPayment } from "../IPayment";

class Paypal implements IPayment {

    billingFee: number = 0.3;

    debit(costumer: Costumer, price: number): void {
        costumer.bankBalance -= (price + this.billingFee);   
    }

    credit(costumer: Costumer, price: number): void {
        costumer.bankBalance += price;
    }
    
}
