import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movement } from '../../core/model/Movement';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddMovementPage } from '../add-movement/add-movement';
import { Formatter } from '../../core/model/Formatter';
import { MovementType } from '../../core/model/MovementType';

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
  balance: String = "0";

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage) {
    this.navCtrl.removeView(this.navCtrl.getPrevious());
    this.movementsSwitch = "expenses";
  }

  ionViewWillEnter() {
    this.updateData();
  }

  refresh(refresher) {
    this.updateData();
    refresher.complete();
  }

  async getExpenses() {
    await this.storage.getItem("expenses").then((data: Array<Movement>) => {
      this.expenses = data;
    }).catch((e) => {
      console.log("No hay gastos");
    });
  }

  async getDeposits() {
    await this.storage.getItem("deposits").then((data: Array<Movement>) => {
      this.deposits = data;
    }).catch((e) => {
      console.log("No hay depósitos");
    });
  }

  async getBalance() {
    await this.storage.getItem("balance").then((data: number) => {
      let formatedBalance = Formatter.format(data);

      this.balance = formatedBalance;
    }).catch((e) => {
      console.log("No hay balance");
    });
  }

  addDeposit() {
    this.navCtrl.push(AddMovementPage, new MovementType("deposit", "deposits"));
  }

  addSpent() {
    this.navCtrl.push(AddMovementPage, new MovementType("spent", "expenses"));
  }

  private async updateData() {
    await this.getExpenses();
    await this.getDeposits();
    await this.getBalance();
  }

}
