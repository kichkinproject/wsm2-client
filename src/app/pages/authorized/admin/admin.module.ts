import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'create', loadChildren: './create/admin-create.module#AdminCreateModule' },
      { path: 'edit', loadChildren: './edit/admin-edit.module#AdminEditModule' },
      { path: 'list', loadChildren: './list/admin-list.module#AdminListModule' },
      { path: 'view', loadChildren: './view/admin-view.module#AdminViewModule' },
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
    AdminComponent,
  ],
  declarations: [
    AdminComponent,
  ],
})
export class AdminModule {
}
