import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroLivenessPage } from './intro-liveness.page';

const routes: Routes = [
  {
    path: '',
    component: IntroLivenessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroLivenessPageRoutingModule {}
