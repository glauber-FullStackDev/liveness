import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivenessPage } from './liveness.page';

const routes: Routes = [
  {
    path: '',
    component: LivenessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivenessPageRoutingModule {}
