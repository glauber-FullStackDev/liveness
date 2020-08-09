import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro-liveness',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'intro-liveness',
    loadChildren: () => import('./intro-liveness/intro-liveness.module').then( m => m.IntroLivenessPageModule)
  },
  {
    path: 'liveness',
    loadChildren: () => import('./liveness/liveness.module').then( m => m.LivenessPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
