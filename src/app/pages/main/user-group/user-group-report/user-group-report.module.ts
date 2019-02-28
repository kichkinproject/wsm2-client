import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupReportComponent } from './user-group-report.component';

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
