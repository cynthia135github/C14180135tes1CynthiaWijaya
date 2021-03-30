import { Component } from '@angular/core';
import { FotoservisService } from '../services/fotoservis.service';

export interface PhotoUpload{
  filePath : string;
  namefile : string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public fotoservice : FotoservisService) {}

  ionViewDidEnter(){
    this.fotoservice.loadLocalPhotos();
  }

  uploadFoto(counter){
    console.log("foto yg mau diupload: "+counter);

    this.fotoservice.uploadtoFirestorage(counter);
  }

  addNewFoto(){
    this.fotoservice.addFoto();
  }

}
