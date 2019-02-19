import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateComponent } from './admin-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCreateComponent,
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
    AdminCreateComponent,
  ],
  declarations: [
    AdminCreateComponent,
  ],
})
export class AdminCreateModule {
}
