import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerListComponent } from './controller-list.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerListComponent,
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
    ControllerListComponent,
  ],
  declarations: [
    ControllerListComponent,
  ],
})
export class ControllerListMolule {
}
