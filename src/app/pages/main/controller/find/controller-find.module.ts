import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerFindComponent } from './controller-find.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerFindComponent,
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
    ControllerFindComponent,
  ],
  declarations: [
    ControllerFindComponent,
  ],
})
export class ControllerFindModule {
}
