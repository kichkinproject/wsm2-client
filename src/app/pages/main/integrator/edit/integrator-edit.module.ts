import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorEditComponent } from './integrator-edit.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorEditComponent,
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
    IntegratorEditComponent,
  ],
  declarations: [
    IntegratorEditComponent,
  ],
})
export class IntegratorEditModule {
}
