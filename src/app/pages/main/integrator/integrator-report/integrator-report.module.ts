import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorReportComponent } from './integrator-report.component';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

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
    LoaderModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
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
