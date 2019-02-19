import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Movement } from '../../core/model/Movement';

@IonicPage()
@Component({
  selector: 'page-add-deposit',
  templateUrl: 'add-deposit.html',
})
export class AddDepositPage {

  concept: string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private alert: AlertController) {
    this.value = 0;
  }

  async addMovement() {
    await this.storage.getItem("deposits").then((data: Array<any>) => {
      let deposits = data;

      deposits.push(new Movement(this.concept, this.value));

      this.storage.setItem("deposits", deposits);
    }).catch(() => {
      let deposits = new Array<Movement>();

      deposits.push(new Movement(this.concept, this.value));

      this.storage.setItem("deposits", deposits);
    })

    this.updateBalance();
    this.showAlert();
  }

  private async updateBalance() {
    await this.storage.getItem("balance").then((data: number) => {
      let balance: number = Number(data) + Number(this.value);
      this.storage.setItem("balance", balance);
    }).catch(() => {
      this.storage.setItem("balance", this.value);
    })
  }

  async showAlert() {
    const alert = this.alert.create({
      title: 'Deposit added correctly',
      buttons: ['Accept']
    });
    await alert.present();
  }

}
