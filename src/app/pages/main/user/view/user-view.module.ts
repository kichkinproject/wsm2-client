import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from './user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UserViewComponent,
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
    UserViewComponent,
  ],
  declarations: [
    UserViewComponent,
  ],
})
export class UserViewModule {
}
