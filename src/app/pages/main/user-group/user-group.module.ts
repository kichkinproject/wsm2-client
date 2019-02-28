import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupComponent } from './user-group.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupComponent,
    children: [
      { path: 'user-group-create', loadChildren: './user-group-create/user-group-create.module#UserGroupCreateModule' },
      { path: 'user-group-edit/:id', loadChildren: './user-group-edit/user-group-edit.module#UserGroupEditModule' },
      { path: 'user-group-list', loadChildren: './user-group-list/user-group-list.module#UserGroupListModule' },
      { path: 'user-group-view/:id', loadChildren: './user-group-view/user-group-view.module#UserGroupViewModule' },
      { path: 'user-group-report', loadChildren: './user-group-report/user-group-report.module#UserGroupReportModule' },
      { path: '**', redirectTo: 'user-group-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    UserGroupComponent,
  ],
  declarations: [
    UserGroupComponent,
  ],
})
export class UserGroupModule {
}
