import { Transaction } from './transaction.entity';
import { FinancialMovement } from './financialMovement.entity';
import { BankAccount } from './bankAccount.entity';

export class SavingsAccount extends BankAccount{

  private maxWithdrawal = 20000;
  private costWithdrawal = 5000;

  constructor() {
    super();
    this.movements = [];
  }

  public consign(transaction: Transaction) {
    if(this.verifyFirstConsign() && transaction.value >= 50000){
      super.consign(transaction);
      console.log('this.verifyFirstConsign() && transaction.value >= 50000');
    }else if(!this.verifyFirstConsign() && transaction.value >= 0){
      if (!this.city.localeCompare(transaction.city)) transaction.value -= 10000;
      console.log('!this.city.localeCompare(transaction.city)) transaction.value -= 10000');
      super.consign(transaction);
    }
  }

  withdrawal(transaction: Transaction) {
    if(!this.validateMonthWithdrawals()) transaction.value += this.costWithdrawal;
    const newBalance: number = this.balance - transaction.value;
    if(newBalance >= this.maxWithdrawal){
      const movement: FinancialMovement = new FinancialMovement();
      movement.withdrawalValue = transaction.value;
      movement.movementDate = Date();
      this.balance = newBalance;
      this.movements.push(movement);
    }
  }

  private validateMonthWithdrawals(): boolean {
    const month: number = new Date().getMonth();
    const year: number = new Date().getFullYear()
    let count = 0;

    for (let _i = 0; _i < this.movements.length; _i++){
      const monthOfMovement: number = new Date(this.movements[_i].movementDate).getMonth();
      const yearOfMovement: number = new Date(this.movements[_i].movementDate).getFullYear();
      if(year == yearOfMovement && month == monthOfMovement){
        count++;
      }
    }
    return count < 3;
  }

  private verifyFirstConsign() : boolean {
    if (this.movements.length == 0){
      return true;
    }
    return false;
  }

}
