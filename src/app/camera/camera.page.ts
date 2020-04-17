import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  constructor(private cameraPreview: CameraPreview) { }

  ngOnInit() {
      // camera options (Size and location). In the following example, the preview uses the rear camera and display the preview in the back of the webview
      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
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

}