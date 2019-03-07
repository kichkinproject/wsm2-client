import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './integrator.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: IntegratorComponent,
    children: [
      { path: 'integrator-create', loadChildren: './integrator-create/integrator-create.module#IntegratorCreateModule' },
      { path: 'integrator-edit/:login', loadChildren: './integrator-edit/integrator-edit.module#IntegratorEditModule' },
      { path: 'integrator-list', loadChildren: './integrator-list/integrator-list.module#IntegratorListModule' },
      { path: 'integrator-view/:login', loadChildren: './integrator-view/integrator-view.module#IntegratorViewModule' },
      { path: 'integrator-report', loadChildren: './integrator-report/integrator-report.module#IntegratorReportModule' },
      { path: '**', redirectTo: 'integrator-list' },
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
    IntegratorComponent,
  ],
  declarations: [
    IntegratorComponent,
  ],
})
export class IntegratorModule {
}
