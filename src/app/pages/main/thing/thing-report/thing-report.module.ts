import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThingReportComponent } from './thing-report.component';

const routes: Routes = [
  {
    path: '',
    component: ThingReportComponent,
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
    ThingReportComponent,
  ],
  declarations: [
    ThingReportComponent,
  ],
})
export class ThingReportModule {
}
