import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Movement } from '../../core/model/Movement';
import { Formatter } from '../../core/model/Formatter';
import { MovementType } from '../../core/model/MovementType';
import { MovementValidatorProvider } from '../../providers/movement-validator/movement-validator';

@IonicPage()
@Component({
  selector: 'page-add-movement',
  templateUrl: 'add-movement.html',
})
export class AddMovementPage {

  movementType: MovementType;
  concept: string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private alert: AlertController, public validator: MovementValidatorProvider) {
    this.movementType = navParams.data;
  }

  async addMovement() {
    await this.storage.getItem(this.movementType.itemType).then((data: Array<Movement>) => {
      this.saveMovement(this.movementType.itemType, data);
    }).catch(() => {
      this.saveMovement(this.movementType.itemType, new Array<Movement>());
    });

    this.updateBalance();
    this.showAlert();
  }

  private async saveMovement(itemName: string, movements: Array<Movement>) {
    let formatedValue = Formatter.format(this.movementType.convertNumberAccordingType(this.value));

    movements.unshift(new Movement(this.concept, formatedValue));

    await this.storage.setItem(itemName, movements);
  }

  private async updateBalance() {
    let value = this.movementType.convertNumberAccordingType(this.value);

    await this.storage.getItem("balance").then((data: number) => {
      let balance: number = Number(data) + Number(value);

      this.storage.setItem("balance", balance);
    }).catch(() => {
      this.storage.setItem("balance", value);
    })
  }

  private async showAlert() {
    const alert = this.alert.create({
      title: this.movementType.type + ' added correctly',
      buttons: ['Accept']
    });
    await alert.present();
  }

}
