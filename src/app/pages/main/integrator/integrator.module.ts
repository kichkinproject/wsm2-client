import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './integrator.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorComponent,
    children: [
      { path: 'integrator-create', loadChildren: './create/integrator-create.module#IntegratorCreateModule' },
      { path: 'integrator-edit', loadChildren: './edit/integrator-edit.module#IntegratorEditModule' },
      { path: 'integrator-list', loadChildren: './list/integrator-list.module#IntegratorListModule' },
      { path: 'integrator-view', loadChildren: './view/integrator-view.module#IntegratorViewModule' },
      { path: '**', redirectTo: 'integrator-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
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
