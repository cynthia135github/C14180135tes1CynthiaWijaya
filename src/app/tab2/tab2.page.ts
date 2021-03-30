import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { FotoservisService } from '../services/fotoservis.service';

const { Storage } = Plugins;

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

  private keyLocalStorage : string = "foto";
  constructor(public fotoservice : FotoservisService) {}

  ionViewDidEnter(){
    this.fotoservice.loadLocalPhotos();
  }

  uploadFoto(counter){
    console.log("foto yg mau diupload: "+counter);

    this.fotoservice.uploadtoFirestorage(counter);

    this.fotoservice.dataFotoLokal.splice(counter, 1);

    Storage.set({
      key : this.keyLocalStorage,
      value : JSON.stringify(this.fotoservice.dataFotoLokal)
    })
    //document.getElementById("uploadbutton"+counter).setAttribute('disabled','true');
  }

  addNewFoto(){
    this.fotoservice.addFoto();
  }

}
