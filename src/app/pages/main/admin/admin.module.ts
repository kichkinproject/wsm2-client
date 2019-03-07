import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin-create', loadChildren: './admin-create/admin-create.module#AdminCreateModule' },
      { path: 'admin-edit/:login', loadChildren: './admin-edit/admin-edit.module#AdminEditModule' },
      { path: 'admin-list', loadChildren: './admin-list/admin-list.module#AdminListModule' },
      { path: 'admin-view/:login', loadChildren: './admin-view/admin-view.module#AdminViewModule' },
      { path: 'admin-report', loadChildren: './admin-report/admin-report.module#AdminReportModule' },
      { path: '**', redirectTo: 'admin-list' },
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
    AdminComponent,
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule {
}
