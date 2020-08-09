import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-intro-liveness',
  templateUrl: './intro-liveness.page.html',
  styleUrls: ['./intro-liveness.page.scss'],
})
export class IntroLivenessPage implements OnInit {

  @ViewChild('mySlider') mySlider: any;

  constructor(
    private navCtrl: NavController,
    private androidPermission: AndroidPermissions
  ) { }

  ngOnInit() {
  }

  slideNext() {
    this.mySlider.slideNext();
  }

  slidePrev() {
    this.mySlider.slidePrev();
  }

  initLiveness() {
    this.androidPermission.requestPermission(this.androidPermission.PERMISSION.CAMERA).then(() => {
      this.navCtrl.navigateForward('liveness');
    }).catch(err => {
      console.log("ERROR ==> ", err);
    })
    
  }

}
