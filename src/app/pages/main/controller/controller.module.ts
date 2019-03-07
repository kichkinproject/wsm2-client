import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerComponent } from './controller.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: ControllerComponent,
    children: [
      { path: 'controller-find', loadChildren: './controller-find/controller-find.module#ControllerFindModule' },
      { path: 'controller-list', loadChildren: './controller-list/controller-list.module#ControllerListModule' },
      { path: 'controller-view/:id', loadChildren: './controller-view/controller-view.module#ControllerViewModule' },
      { path: 'controller-report', loadChildren: './controller-report/controller-report.module#ControllerReportModule' },
      { path: '**', redirectTo: 'controller-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    LoaderModule,
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
