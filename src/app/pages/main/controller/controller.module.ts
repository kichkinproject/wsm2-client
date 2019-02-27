import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerComponent } from './controller.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerComponent,
    children: [
      { path: 'controller-find', loadChildren: './find/controller-find.module#ControllerFindModule' },
      { path: 'controller-list', loadChildren: './list/controller-list.module#ControllerListModule' },
      { path: 'controller-view', loadChildren: './view/controller-view.module#ControllerViewModule' },
      { path: 'controller-report', loadChildren: './report/controller-report.module#ControllerReportModule' },
      { path: '**', redirectTo: 'controller-list' },
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
