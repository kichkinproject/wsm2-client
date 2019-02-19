import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './integrator.component';

const routes: Routes = [
  {
    path: '',
    component: IntegratorComponent,
    children: [
      { path: 'create', loadChildren: './create/integrator-create.module#IntegratorCreateModule' },
      { path: 'edit', loadChildren: './edit/integrator-edit.module#IntegratorEditModule' },
      { path: 'list', loadChildren: './list/integrator-list.module#IntegratorListModule' },
      { path: 'view', loadChildren: './view/integrator-view.module#IntegratorViewModule' },
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
    IntegratorComponent,
  ],
  declarations: [
    IntegratorComponent,
  ],
})
export class IntegratorModule {
}
