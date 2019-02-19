import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerComponent } from './controller.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerComponent,
    children: [
      { path: 'find', loadChildren: './find/controller-find.module#ControllerFindModule' },
      { path: 'list', loadChildren: './list/controller-list.module#ControllerListModule' },
      { path: 'view', loadChildren: './view/controller-view.module#ControllerViewModule' },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    ControllerComponent,
  ],
  declarations: [
    ControllerComponent,
  ],
})
export class ControllerModule {
}
