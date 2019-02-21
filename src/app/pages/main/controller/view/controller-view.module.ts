import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerViewComponent } from './controller-view.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerViewComponent,
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
    ControllerViewComponent,
  ],
  declarations: [
    ControllerViewComponent,
  ],
})
export class ControllerViewModule {
}
