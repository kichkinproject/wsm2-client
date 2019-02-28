import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerReportComponent } from './controller-report.component';

const routes: Routes = [
  {
    path: '',
    component: ControllerReportComponent,
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
    ControllerReportComponent,
  ],
  declarations: [
    ControllerReportComponent,
  ],
})
export class ControllerReportModule {
}
