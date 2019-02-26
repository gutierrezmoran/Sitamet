import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Movement } from '../../core/model/Movement';
import { NativeStorage } from '@ionic-native/native-storage';
import { AddMovementPage } from '../add-movement/add-movement';
import { NumberFormatter } from '../../core/model/NumberFormatter';
import { MovementPage } from '../movement/movement';

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
  balance: String = NumberFormatter.pointsAndCommas(0);

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private modalCtrl: ModalController) {
    this.navCtrl.removeView(this.navCtrl.getPrevious());
    this.movementsSwitch = "all";
  }

  ionViewWillEnter() {
    this.updateData();
  }

  async getMovements() {
    await this.storage.getItem("movements").then((data: Array<Movement>) => {
      this.movements = data;
    }).catch((e) => {
      this.movements = new Array<Movement>();
    });
  }

  getExpenses() {
    this.expenses = this.movements.filter(movement => !movement.isPositive);
  }

  getDeposits() {
    this.deposits = this.movements.filter(movement => movement.isPositive);
  }

  async getBalance() {
    await this.storage.getItem("balance").then((data: number) => {
      let formatedBalance = NumberFormatter.pointsAndCommas(data);

      this.balance = formatedBalance;
    }).catch((e) => {
      this.balance = NumberFormatter.pointsAndCommas(0);
    });
  }

  addMovement() {
    this.navCtrl.push(AddMovementPage);
  }

  showMovement(movement: Movement) {
    let profileModal = this.modalCtrl.create(MovementPage, movement);

    profileModal.present();
  }

  private async updateData() {
    await this.getMovements();
    await this.getDeposits();
    await this.getExpenses();
    await this.getBalance();
  }

}
