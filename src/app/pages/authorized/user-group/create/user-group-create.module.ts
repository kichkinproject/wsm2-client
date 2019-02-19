import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupCreateComponent } from './user-group-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupCreateComponent,
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
    UserGroupCreateComponent,
  ],
  declarations: [
    UserGroupCreateComponent,
  ],
})
export class UserGroupCreateModule {
}
