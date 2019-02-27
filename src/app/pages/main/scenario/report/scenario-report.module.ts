import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioReportComponent } from './scenario-report.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioReportComponent,
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
    ScenarioReportComponent,
  ],
  declarations: [
    ScenarioReportComponent,
  ],
})
export class ScenarioReportModule {
}
