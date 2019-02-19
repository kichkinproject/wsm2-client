import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './identification.component';

const routes: Routes = [
  {
    path: '',
    component: IdentificationComponent,
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
    IdentificationComponent,
  ],
  declarations: [
    IdentificationComponent,
  ],
})
export class IdentificationModule {
}
