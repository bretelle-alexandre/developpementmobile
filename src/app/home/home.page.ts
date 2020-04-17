import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  title: string;
  imgData: string;

  public geoLatitude: number;
  public geoLongitude: number;

  constructor(private alertController: AlertController, private camera: Camera, private geolocation: Geolocation, private localNotifications: LocalNotifications) {}

  updateTitle() {
    this.title = 'Mon Nouveau Titre';
  }

  sendnotif() {
    this.localNotifications.schedule([{
     id: 1,
     text: 'Notification 1',
    }
  ]);
    
  this.localNotifications.schedule([{
     id: 1,
     text: 'Notification 2',
     trigger: {at: new Date(new Date().getTime() + 3600)},}
    ]);
  }

  ngOnInit(): void {
    console.log("je suis un OnInit")
 
    /* this.geolocation.getCurrentPosition().then((resp) => {
       // resp.coords.latitude
       // resp.coords.longitude
       console.log(resp)
     }).catch((error) => {
       console.log('Error getting location', error);
     });*/
 
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      //console.log(data)
 
      this.geoLongitude = data.coords.longitude
      this.geoLatitude = data.coords.latitude
 
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  
     watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
  }

  /**
   * https://ionicframework.com/docs/api/alert
   */
  async fireAlert() {
    // creation de l alerte
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });
    // quand l alerte sera masquée
    alert.onDidDismiss().then(() => console.log('alerte masquée'))

    // affichage de l alerte
    await alert.present();
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      this.imgData = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}
