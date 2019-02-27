import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SensorReportComponent } from './sensor-report.component';

const routes: Routes = [
  {
    path: '',
    component: SensorReportComponent,
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
    SensorReportComponent,
  ],
  declarations: [
    SensorReportComponent,
  ],
})
export class SensorReportModule {
}
