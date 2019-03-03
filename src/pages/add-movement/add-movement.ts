import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Movement } from '../../core/model/Movement';
import { MovementValidatorProvider } from '../../providers/movement-validator/movement-validator';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-add-movement',
  templateUrl: 'add-movement.html',
})
export class AddMovementPage {

  concept: string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private alert: AlertController, public validator: MovementValidatorProvider, private translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.reset();
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
    movements.unshift(new Movement(this.concept, this.value));

    await this.storage.setItem(itemName, movements);
  }

  private async showAlert() {
    const alert = this.alert.create({
      title: this.translate.instant("MOVEMENT_ADD_CORRECTLY"),
      buttons: [this.translate.instant("ACCEPT")]
    });
    await alert.present();
  }

  private reset() {
    this.concept = "";
    this.value = null;
    this.validator.reset();
  }

}
