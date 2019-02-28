import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SensorListComponent } from './sensor-list.component';

const routes: Routes = [
  {
    path: '',
    component: SensorListComponent,
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
    SensorListComponent,
  ],
  declarations: [
    SensorListComponent,
  ],
})
export class SensorListModule {
}
