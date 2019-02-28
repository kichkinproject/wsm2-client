import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorViewComponent } from './integrator-view.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorViewComponent,
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
    IntegratorViewComponent,
  ],
  declarations: [
    IntegratorViewComponent,
  ],
})
export class IntegratorViewModule {
}
