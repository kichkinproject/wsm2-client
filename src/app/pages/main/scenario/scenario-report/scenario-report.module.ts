import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioReportComponent } from './scenario-report.component';
import {Wsm2AccountService} from '../../../../services/wsm2-account-service';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';

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
    Wsm2AccountService,
    Wsm2DataService,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
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