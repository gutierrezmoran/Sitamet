import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movement } from '../../core/model/Movement';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddDepositPage } from '../add-deposit/add-deposit';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  movementsSwitch: String;
  movements: Array<Movement> = new Array<Movement>();
  expenses: Array<Movement> = new Array<Movement>();
  deposits: Array<Movement> = new Array<Movement>();
  balance: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage) {
    this.navCtrl.removeView(this.navCtrl.getPrevious());
    this.movementsSwitch = "spent";
    this.getExpenses();
    this.getDeposits();
    this.getBalance();
  }

  refresh(refresher) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getExpenses();
      this.getDeposits();
      this.getBalance();

      refresher.complete();
    }, 2000);
  }

  async getExpenses() {
    await this.storage.getItem("expenses").then((data) => {
      this.expenses = data;
    }).catch((e) => {
      console.log("No hay gastos");
    });
  }

  async getDeposits() {
    await this.storage.getItem("deposits").then((data) => {
      this.deposits = data;
    }).catch((e) => {
      console.log("No hay depósitos");
    });
  }

  async getBalance() {
    await this.storage.getItem("balance").then((data) => {
      this.balance = data;
    }).catch((e) => {
      console.log("No hay balance");
    });
  }

  addDeposit() {
    this.navCtrl.push(AddDepositPage);
  }

}
