import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorCreateComponent } from './integrator-create.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorCreateComponent,
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
    IntegratorCreateComponent,
  ],
  declarations: [
    IntegratorCreateComponent,
  ],
})
export class IntegratorCreateModule {
}
