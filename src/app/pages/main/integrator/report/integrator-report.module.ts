import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorReportComponent } from './integrator-report.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorReportComponent,
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
    IntegratorReportComponent,
  ],
  declarations: [
    IntegratorReportComponent,
  ],
})
export class IntegratorReportModule {
}
