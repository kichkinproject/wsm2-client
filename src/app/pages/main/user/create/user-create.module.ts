import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserCreateComponent,
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
    UserCreateComponent,
  ],
  declarations: [
    UserCreateComponent,
  ],
})
export class UserCreateModule {
}
