import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SensorFindComponent } from './sensor-find.component';

const routes: Routes = [
  {
    path: '',
    component: SensorFindComponent,
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
    SensorFindComponent,
  ],
  declarations: [
    SensorFindComponent,
  ],
})
export class SensorFindModule {
}
