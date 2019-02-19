import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupListComponent } from './user-group-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserGroupListComponent,
  ],
  declarations: [
    UserGroupListComponent,
  ],
})
export class UserGroupListModule {
}
