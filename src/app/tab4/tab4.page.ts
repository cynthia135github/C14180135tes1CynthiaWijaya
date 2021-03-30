import { Component, OnInit } from '@angular/core';
import { FotoservisService } from '../services/fotoservis.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public fotoservice : FotoservisService) { }

  async ngOnInit() {
    this.fotoservice.loadFotoFromFirestorage();
    this.fotoservice.loadLocalPhotos();
  }

}
