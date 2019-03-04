import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { AppGuard } from './app.guard';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'identification',
    loadChildren: './pages/identification/identification.module#IdentificationModule',
  },
  {
    path: 'main',
    loadChildren: './pages/main/main.module#MainModule',
    canActivate: [AppGuard]
  },
  {
    path: '**',
    redirectTo: 'identification'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ],
  // providers: [
  //   AppGuard,
  // ],
})
export class AppRoutingModule { }
