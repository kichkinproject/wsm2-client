import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditComponent } from './admin-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminEditComponent,
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
    AdminEditComponent,
  ],
  declarations: [
    AdminEditComponent,
  ],
})
export class AdminEditModule {
}
