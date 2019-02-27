import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin-create', loadChildren: './create/admin-create.module#AdminCreateModule' },
      { path: 'admin-edit', loadChildren: './edit/admin-edit.module#AdminEditModule' },
      { path: 'admin-list', loadChildren: './list/admin-list.module#AdminListModule' },
      { path: 'admin-view', loadChildren: './view/admin-view.module#AdminViewModule' },
      { path: 'admin-report', loadChildren: './report/admin-report.module#AdminReportModule' },
      { path: '**', redirectTo: 'admin-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
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
