import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins  } from '@capacitor/core';


const { Camera, Filesystem, Storage } = Plugins;

export interface PhotoUpload{
  urlImage : string;
  namefile : string;
}

export interface PhotoData{
  filePath: string; 
  webviewPath: string; 
  dataImage : File
}

@Injectable({
  providedIn: 'root'
})
export class FotoservisService {

  //Uploaded Foto
  public dataFotoUpload: PhotoUpload[] = [];
  private keyUploadedStorage : string = "fotoFirestorage";

  //Local Foto
  public dataFotoLokal: PhotoData[] = [];

  private keyLocalStorage : string = "foto";

  constructor(public firestorage : AngularFireStorage) { }

  //Localll
  public async addFoto(){
    const FotoCaptured = await Camera.getPhoto({
      resultType : CameraResultType.Uri,
      source : CameraSource.Camera,
      quality : 100
    });

    const fileFoto = await this.saveFotoLokal(FotoCaptured);

    this.dataFotoLokal.unshift(fileFoto);

    Storage.set({
      key : this.keyLocalStorage,
      value : JSON.stringify(this.dataFotoLokal)
    })
  }

  public async saveFotoLokal(foto : CameraPhoto){
    const base64Data = await this.readAsBase64(foto);

    const randomIdImage = Math.random().toString(36).substring(2, 8);
    const fileName = `${new Date().getTime()}_${randomIdImage}.jpeg`;

    const simpanFileFoto = await Filesystem.writeFile({
      path : fileName,
      data : base64Data,
      directory : FilesystemDirectory.Data
    });

    const response = await fetch(foto.webPath);
    const blob = await response.blob();
    const dataFoto = new File([blob], foto.path, {type : "image/jpeg"})

    return{
      filePath : fileName,
      webviewPath : foto.webPath,
      dataImage : dataFoto
    }
  }

  private async readAsBase64(foto : CameraPhoto){
    
    const response = await fetch(foto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
    
  }

  convertBlobToBase64 = (blob : Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadLocalPhotos(){
    const arrFotoLokal = await Storage.get({key : this.keyLocalStorage});
    this.dataFotoLokal = JSON.parse(arrFotoLokal.value) || [];

    for(let ftlocal of this.dataFotoLokal){
      const readFile = await Filesystem.readFile({
        path: ftlocal.filePath,
        directory : FilesystemDirectory.Data
      });
      ftlocal.webviewPath = `data:image/jpeg;base64,${readFile.data}`;

      const response = await fetch(ftlocal.webviewPath);
      const blob = await response.blob();

      ftlocal.dataImage = new File([blob], ftlocal.filePath,{
        type : "image/jpeg"
      });
    }
  }

  //Firestorage
  public async uploadtoFirestorage(counter){
    const namaFilenya = this.dataFotoLokal[counter].filePath;
    const pathFilenya = `images/${namaFilenya}`;

    //const webPathnya = this.dataFotoLokal[counter].webviewPath;
    //const blob = await webPathnya.blob();
    const FilePhotonya = this.dataFotoLokal[counter].dataImage;

    var imgurl = "";

    await this.firestorage.upload(pathFilenya, FilePhotonya). then((result) => {
      result.ref.getDownloadURL().then((url) => {
        
        imgurl = url;
        console.log("img urlnya: "+ url);

        var newfoto = {
          urlImage : imgurl,
          namefile : namaFilenya
        }

        //simpan url image yg ditampung ke dlm array dataFoto supaya bs dipanggil /di load brdsr url
        this.dataFotoUpload.unshift(newfoto);

        //simpan array dataFoto ke Storage Local
        Storage.set({
          key : this.keyUploadedStorage,
          value : JSON.stringify(this.dataFotoUpload)
        });
      });
    });

  }

}
