import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorListComponent } from './integrator-list.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorListComponent,
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
    IntegratorListComponent,
  ],
  declarations: [
    IntegratorListComponent,
  ],
})
export class IntegratorListModule {
}
