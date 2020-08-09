import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroLivenessPageRoutingModule } from './intro-liveness-routing.module';

import { IntroLivenessPage } from './intro-liveness.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroLivenessPageRoutingModule
  ],
  declarations: [IntroLivenessPage]
})
export class IntroLivenessPageModule {}
