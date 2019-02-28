import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserEditComponent,
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
    UserEditComponent,
  ],
  declarations: [
    UserEditComponent,
  ],
})
export class UserEditModule {
}
