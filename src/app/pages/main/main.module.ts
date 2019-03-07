import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import {Wsm2AccountService} from '../../services/wsm2-account-service';
import {Wsm2DataService} from '../../services/wsm2-data-service';
import {MainGuard} from './main.guard';
import {SelectionPanelComponent, SelectionPanelModule} from '../../components/selection-panel/selection-panel.component';
import { LoaderModule } from "../../components/loader/loader.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'about', loadChildren: './about/about.module#AboutModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: 'cabinet', loadChildren: './cabinet/cabinet.module#CabinetModule' },
      { path: 'controller', loadChildren: './controller/controller.module#ControllerModule' },
      { path: 'integrator', loadChildren: './integrator/integrator.module#IntegratorModule' },
      { path: 'scenario', loadChildren: './scenario/scenario.module#ScenarioModule' },
      { path: 'sensor', loadChildren: './sensor/sensor.module#SensorModule' },
      { path: 'thing', loadChildren: './thing/thing.module#ThingModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'user-group', loadChildren: './user-group/user-group.module#UserGroupModule' },
      { path: '**', canActivate: [MainGuard] }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Wsm2AccountService,
    // Wsm2DataService,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    SelectionPanelModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
    MainGuard
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule {
}
