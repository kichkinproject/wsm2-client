import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportComponent } from './admin-report.component';

const routes: Routes = [
  {
    path: '',
    component: AdminReportComponent,
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
    AdminReportComponent,
  ],
  declarations: [
    AdminReportComponent,
  ],
})
export class AdminReportModule {
}
