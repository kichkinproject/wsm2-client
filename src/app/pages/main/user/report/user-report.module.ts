import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserReportComponent } from './user-report.component';

const routes: Routes = [
  {
    path: '',
    component: UserReportComponent,
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
    UserReportComponent,
  ],
  declarations: [
    UserReportComponent,
  ],
})
export class UserReportModule {
}
