import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupViewComponent } from './user-group-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupViewComponent,
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
    UserGroupViewComponent,
  ],
  declarations: [
    UserGroupViewComponent,
  ],
})
export class UserGroupViewModule {
}
