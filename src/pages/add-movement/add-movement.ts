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
    await this.updateBalance();

    await this.storage.getItem("movements").then((data: Array<Movement>) => {
      this.saveMovement("movements", data);
    }).catch(() => {
      this.saveMovement("movements", new Array<Movement>());
    });

    await this.showAlert();
    this.reset();
  }

  private async saveMovement(itemName: string, movements: Array<Movement>) {
    let balance;
    
    await this.storage.getItem("balance").then(data => balance = data);

    movements.unshift(new Movement(this.concept, this.value, balance));

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
