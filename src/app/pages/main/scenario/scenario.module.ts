import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioComponent } from './scenario.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioComponent,
    children: [
      // { path: 'scenario-create', loadChildren: './create/scenario-create.module#ScenarioCreateModule' },
      { path: 'scenario-edit', loadChildren: './edit/scenario-edit.module#ScenarioEditModule' },
      { path: 'scenario-list', loadChildren: './list/scenario-list.module#ScenarioListModule' },
      { path: 'scenario-view', loadChildren: './view/scenario-view.module#ScenarioViewModule' },
      { path: 'scenario-report', loadChildren: './report/scenario-report.module#ScenarioReportModule' },
      { path: '**', redirectTo: 'scenario-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
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
