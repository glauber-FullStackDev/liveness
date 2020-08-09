import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-intro-liveness',
  templateUrl: './intro-liveness.page.html',
  styleUrls: ['./intro-liveness.page.scss'],
})
export class IntroLivenessPage implements OnInit {

  @ViewChild('mySlider') mySlider: any;

  constructor() { }

  ngOnInit() {
  }

  slideNext() {
    this.mySlider.slideNext();
  }

  slidePrev() {
    this.mySlider.slidePrev();
  }

  initLiveness() {
    
  }

}
