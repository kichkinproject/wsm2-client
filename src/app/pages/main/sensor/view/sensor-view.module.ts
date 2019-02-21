import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SensorViewComponent } from './sensor-view.component';

const routes: Routes = [
  {
    path: '',
    component: SensorViewComponent,
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
    SensorViewComponent,
  ],
  declarations: [
    SensorViewComponent,
  ],
})
export class SensorViewModule {
}
