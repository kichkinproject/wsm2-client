import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupReportComponent } from './user-group-report.component';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: UserGroupReportComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    LoaderModule,
  ],
  exports: [
    UserGroupReportComponent,
  ],
  declarations: [
    UserGroupReportComponent,
  ],
})
export class UserGroupReportModule {
}
