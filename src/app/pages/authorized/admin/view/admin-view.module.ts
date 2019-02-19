import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
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
    AdminViewComponent,
  ],
  declarations: [
    AdminViewComponent,
  ],
})
export class AdminViewModule {
}
