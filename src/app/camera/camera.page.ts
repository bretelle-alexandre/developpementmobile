import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {

  constructor(private cameraPreview: CameraPreview) { }

  ionViewDidEnter() {
        const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 100,
        width: window.screen.width / 1.5,
        height: window.screen.height / 1.5,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: false,
        alpha: 1
      }

      // start camera
      this.cameraPreview.startCamera(cameraPreviewOpts).then(
        (res) => {
          console.log(res)
        },
        (err) => {
          console.log(err)
        });        
  }


  // Stop the camera preview
  stopCamera() {
  this.cameraPreview.stopCamera();
  }

  // Switch camera
  switchCamera() {
  this.cameraPreview.switchCamera();
  }

  // picture options
  pictureOpts: CameraPreviewPictureOptions = {
  width: 1280,
  height: 1280,
  quality: 85
}
}