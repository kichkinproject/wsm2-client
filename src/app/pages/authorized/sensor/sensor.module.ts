import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorComponent } from './sensor.component';

const routes: Routes = [
  {
    path: '',
    component: SensorComponent,
    children: [
      { path: 'find', loadChildren: './find/sensor-find.module#SensorFindModule' },
      { path: 'list', loadChildren: './list/sensor-list.module#SensorListModule' },
      { path: 'view', loadChildren: './view/sensor-view.module#SensorViewModule' },
      { path: '**', redirectTo: 'list' },
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
