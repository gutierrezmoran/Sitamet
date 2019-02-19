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
    await this.storage.getItem("deposits").then((data: Array<Movement>) => {
      this.saveMovement("deposits", data);
    }).catch(() => {
      this.saveMovement("deposits", new Array<Movement>());
    });

    this.updateBalance();
    this.showAlert();
  }

  private async saveMovement(itemName: string, movements: Array<Movement>) {
    let formatedValue = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2 }).format(this.value);

    movements.unshift(new Movement(this.concept, formatedValue));
    await this.storage.setItem(itemName, movements);
  }

  private async updateBalance() {
    await this.storage.getItem("balance").then((data: number) => {
      let balance: number = Number(data) + Number(this.value);

      this.storage.setItem("balance", balance);
    }).catch(() => {
      this.storage.setItem("balance", this.value);
    })
  }

  private async showAlert() {
    const alert = this.alert.create({
      title: 'Deposit added correctly',
      buttons: ['Accept']
    });
    await alert.present();
  }

}
