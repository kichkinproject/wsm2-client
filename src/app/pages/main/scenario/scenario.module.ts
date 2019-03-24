import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioComponent } from './scenario.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: ScenarioComponent,
    children: [
      { path: 'scenario-create', loadChildren: './scenario-create/scenario-create.module#ScenarioCreateModule' },
      { path: 'scenario-edit/:id', loadChildren: './scenario-edit/scenario-edit.module#ScenarioEditModule' },
      { path: 'scenario-list', loadChildren: './scenario-list/scenario-list.module#ScenarioListModule' },
      { path: 'scenario-view/:id', loadChildren: './scenario-view/scenario-view.module#ScenarioViewModule' },
      { path: 'scenario-report', loadChildren: './scenario-report/scenario-report.module#ScenarioReportModule' },
      { path: 'scenario-controller-link', loadChildren: './scenario-controller-link/scenario-controller-link.module#ScenarioControllerLinkModule' },
      { path: '**', redirectTo: 'scenario-list' },
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
    ScenarioComponent,
  ],
  declarations: [
    ScenarioComponent,
  ],
})
export class ScenarioModule {
}
