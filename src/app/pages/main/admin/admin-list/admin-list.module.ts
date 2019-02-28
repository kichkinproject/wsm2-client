import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
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
    AdminListComponent,
  ],
  declarations: [
    AdminListComponent,
  ],
})
export class AdminListModule {
}
