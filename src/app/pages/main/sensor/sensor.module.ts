import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorComponent } from './sensor.component';

const routes: Routes = [
  {
    path: '',
    component: SensorComponent,
    children: [
      { path: 'sensor-find', loadChildren: './find/sensor-find.module#SensorFindModule' },
      { path: 'sensor-list', loadChildren: './list/sensor-list.module#SensorListModule' },
      { path: 'sensor-view', loadChildren: './view/sensor-view.module#SensorViewModule' },
      { path: '**', redirectTo: 'sensor-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    SensorComponent,
  ],
  declarations: [
    SensorComponent,
  ],
})
export class SensorModule {
}
