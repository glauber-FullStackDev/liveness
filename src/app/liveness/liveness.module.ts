import { LottieModule } from 'ngx-lottie';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivenessPageRoutingModule } from './liveness-routing.module';

import { LivenessPage } from './liveness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivenessPageRoutingModule,
    LottieModule
  ],
  declarations: [LivenessPage]
})
export class LivenessPageModule {}
