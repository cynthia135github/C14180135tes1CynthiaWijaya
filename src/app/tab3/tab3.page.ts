import { Component } from '@angular/core';
import { FotoservisService } from '../services/fotoservis.service';
import { NavController, NavParams } from '@ionic/angular'; 


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public fotoservice : FotoservisService, public pindahHal: NavController) {}

  async ionViewDidEnter(){
    this.fotoservice.loadFotoFromFirestorage();
  }

  gotoTab4(){
    this.pindahHal.navigateForward(["tab4"]);
  }
}
