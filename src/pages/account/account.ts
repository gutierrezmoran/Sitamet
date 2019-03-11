import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Movement } from '../../core/model/Movement';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddMovementPage } from '../add-movement/add-movement';
import { NumberFormatter } from '../../core/model/NumberFormatter';
import { MovementPage } from '../movement/movement';
import { DateTimeFormatter } from '../../core/model/DateTimeFormatter';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  movementsSwitch: String;
  movements: Array<Movement>;
  expenses: Array<Movement>;
  deposits: Array<Movement>;
  balance: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private modalCtrl: ModalController) {
    this.storage.setItem("lastAccess", DateTimeFormatter.shortDateTime());
    this.movements = new Array<Movement>();
    this.expenses = Array<Movement>();
    this.deposits = Array<Movement>();
    this.navCtrl.removeView(this.navCtrl.getPrevious());
    this.balance = NumberFormatter.pointsAndCommas(0);
    this.movementsSwitch = "0";
  }

  async ionViewWillEnter() {
    await this.updateData();
  }


  async filterMovements(ev: any) {
    await this.getMovements();

    const value = ev.target.value;

    if (value && value.trim() != '') {
      this.movements = this.movements.filter((item: Movement) => {
        return (item.concept.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }
  }

  async getMovements() {
    await this.storage.getItem("movements").then((data: Array<Movement>) => this.movements = data)
      .catch(() => this.movements = new Array<Movement>());
  }

  async filterExpenses(ev: any) {
    this.getExpenses();

    const value = ev.target.value;

    if (value && value.trim() != '') {
      this.expenses = this.expenses.filter((item: Movement) => {
        return (item.concept.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }
  }

  getExpenses() {
    this.expenses = this.movements.filter(movement => !movement.isPositive);
  }

  async filterDeposits(ev: any) {
    this.getDeposits();

    const value = ev.target.value;

    if (value && value.trim() != '') {
      this.deposits = this.deposits.filter((item: Movement) => {
        return (item.concept.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }
  }

  getDeposits() {
    this.deposits = this.movements.filter(movement => movement.isPositive);
  }

  addMovement() {
    this.navCtrl.push(AddMovementPage);
  }

  showMovement(movement: Movement) {
    this.modalCtrl.create(MovementPage, movement).present();
  }

  private calcBalance() {
    let balance = 0;
    this.movements.forEach((m: Movement) => balance += Number(m.value));
    this.balance = NumberFormatter.pointsAndCommas(balance);
  }

  async removeMovement(movement: Movement) {
    this.movements.splice(this.movements.indexOf(movement), 1);
    await this.storage.setItem("movements", this.movements);
    await this.updateData();
  }

  private async updateData() {
    await this.getMovements();
    await this.getDeposits();
    await this.getExpenses();
    await this.calcBalance();
  }

}
