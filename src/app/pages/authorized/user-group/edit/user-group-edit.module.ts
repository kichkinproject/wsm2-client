import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupEditComponent } from './user-group-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupEditComponent,
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
    UserGroupEditComponent,
  ],
  declarations: [
    UserGroupEditComponent,
  ],
})
export class UserGroupEditModule {
}
