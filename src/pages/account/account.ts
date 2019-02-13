import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovementsProvider } from '../../providers/movements/movements';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  movementsSwitch: String;
  movements: Array<any>;
  expenses: Array<any>;
  deposits: Array<any>;
  balance: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private movementsCtrl: MovementsProvider) {
    this.navCtrl.remove(0);
    this.movementsSwitch = "all";
    this.movements = this.allMovements;
    this.deposits = this.getDeposits();
    this.expenses = this.getExpenses();
    this.balance = this.getBalance();
  }

  get allMovements(): Array<any> {
    return this.movementsCtrl.allMovements;
  }

  getExpenses(): Array<any> {
    return this.movementsCtrl.expenses;
  }

  getDeposits(): Array<any> {
    return this.movementsCtrl.deposits;
  }

  getBalance(): Array<any> {
    return this.movementsCtrl.balance;
  }

}
