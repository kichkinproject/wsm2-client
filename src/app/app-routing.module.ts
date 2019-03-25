import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { environment } from '../environments/environment';
import {AppGuard} from './app.guard';
import {AppResolverService} from './app-resolver.service';

const routes: Routes = [
  {
    path: 'identification',
    loadChildren: './pages/identification/identification.module#IdentificationModule',
  },
  {
    path: 'main',
    loadChildren: './pages/main/main.module#MainModule',
    // resolve: {
    //   resolved: AppResolverService
    // },
    canActivate: [AppGuard]
  },
  {
    path: '**',
    redirectTo: 'identification'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
