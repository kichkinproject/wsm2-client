import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorComponent } from './sensor.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: SensorComponent,
    children: [
      { path: 'sensor-find', loadChildren: './sensor-find/sensor-find.module#SensorFindModule' },
      { path: 'sensor-list', loadChildren: './sensor-list/sensor-list.module#SensorListModule' },
      { path: 'sensor-view/:id', loadChildren: './sensor-view/sensor-view.module#SensorViewModule' },
      { path: 'sensor-controller-link/:id', loadChildren: './sensor-controller-link/sensor-controller-link.module#SensorControllerLinkModule' },
      { path: 'sensor-report', loadChildren: './sensor-report/sensor-report.module#SensorReportModule' },
      { path: '**', redirectTo: 'sensor-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    LoaderModule,
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
