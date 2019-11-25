import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.page.html',
  styleUrls: ['./expense-update.page.scss'],
})
export class ExpenseUpdatePage implements OnInit {
  base64Image;
  picture;

  constructor(private camera: Camera) { }

  ngOnInit() {
  }

  AccessCamera(){

    this.camera.getPicture({
    targetWidth:512,
    targetHeight:512,
    correctOrientation:true,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL
      }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,'+imageData;
        this.picture = imageData;
            }, (err) => {
        console.log(err);
      });
   }
   
   AccessGallery(){
    this.camera.getPicture({
       sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
       destinationType: this.camera.DestinationType.DATA_URL
      }).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,'+imageData;
        this.picture = imageData;
           }, (err) => {
        console.log(err);
      });
   }

}
