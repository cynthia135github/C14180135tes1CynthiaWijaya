import { Component } from '@angular/core';
import { FotoservisService } from '../services/fotoservis.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public fotoservice : FotoservisService) {}

  async ionViewDidEnter(){
    this.fotoservice.loadFotoFromFirestorage();
  }
}
