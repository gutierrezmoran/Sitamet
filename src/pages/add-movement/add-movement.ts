import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Movement } from '../../core/model/Movement';
import { MovementValidatorProvider } from '../../providers/movement-validator/movement-validator';

@IonicPage()
@Component({
  selector: 'page-add-movement',
  templateUrl: 'add-movement.html',
})
export class AddMovementPage {

  concept: string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private alert: AlertController, public validator: MovementValidatorProvider) {
  }

  async addMovement() {
    await this.storage.getItem("movements").then((data: Array<Movement>) => {
      this.saveMovement("movements", data);
    }).catch(() => {
      this.saveMovement("movements", new Array<Movement>());
    });

    await this.showAlert();
    this.reset();
  }

  private async saveMovement(itemName: string, movements: Array<Movement>) {
    let balance = Number(this.value) + Number(this.getBalance(movements));

    movements.unshift(new Movement(this.concept, this.value, balance));

    await this.storage.setItem(itemName, movements);
  }

  private getBalance(movements: Array<Movement>): number {
    let balance = 0;

    movements.forEach((m: Movement) => {
      balance += Number(m._value);
    })

    return balance;
  }

  private async showAlert() {
    const alert = this.alert.create({
      title: 'Movement added correctly',
      buttons: ['Accept']
    });
    await alert.present();
  }

  private reset() {
    this.concept = "";
    this.value = null;
    this.validator.reset();
  }

}
