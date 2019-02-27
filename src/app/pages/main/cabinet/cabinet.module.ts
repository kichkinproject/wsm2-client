import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
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
    CabinetComponent,
  ],
  declarations: [
    CabinetComponent,
  ],
})
export class CabinetModule {
}
