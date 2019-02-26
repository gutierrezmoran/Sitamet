import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Movement } from '../../core/model/Movement';

@IonicPage()
@Component({
  selector: 'page-movement',
  templateUrl: 'movement.html',
})
export class MovementPage {

  movement: Movement;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.movement = viewCtrl.data;
  }

}
