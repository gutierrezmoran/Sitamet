import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Movement } from '../../core/model/Movement';
import { Formatter } from '../../core/model/Formatter';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-deposit',
  templateUrl: 'add-deposit.html',
})
export class AddDepositPage {

  validatorDeposits: FormGroup;
  validatorDepositsMessages = {
    'concept': [
      { type: 'required', message: 'The concept is required.'},
      { type: 'minlength', message: 'Must be at least 5 characters long.'},
      { type: 'maxlength', message: 'Cannot be more than 50 characters long.' },
		  { type: 'pattern', message: 'Your concept must contain only numbers, letters, whitespaces, points and commas.' },
    ],
    'value': [
      { type: 'required', message: 'The value is required.'},
      { type: 'pattern', message: 'Must contain only numbers and optional part decimal.' }
    ]
}
  concept: string;
  value: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: NativeStorage, private alert: AlertController) {
    this.initializeValidator();
  }

  private initializeValidator() {
    this.validatorDeposits = new FormGroup({
      concept: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern("[A-Za-z0-9\\s\\.\\,]+")]),
      value: new FormControl('', [Validators.required, Validators.pattern("[0-9]+([.][0-9]+)?")])
    });
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
    let formatedValue = Formatter.format(this.value);

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

  hasError(control: AbstractControl): boolean {
    if(control.dirty) {
      return control.errors != null;
    }
  }

  errorsFormGroup(formGroup: FormGroup): boolean {
    if(formGroup.dirty) {
      return !formGroup.valid;
    }

    return true;
  }

}
