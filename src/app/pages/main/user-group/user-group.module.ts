import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupComponent } from './user-group.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupComponent,
    children: [
      { path: 'user-group-create', loadChildren: './create/user-group-create.module#UserGroupCreateModule' },
      { path: 'user-group-edit', loadChildren: './edit/user-group-edit.module#UserGroupEditModule' },
      { path: 'user-group-list', loadChildren: './list/user-group-list.module#UserGroupListModule' },
      { path: 'user-group-view', loadChildren: './view/user-group-view.module#UserGroupViewModule' },
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
