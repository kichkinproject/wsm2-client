import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'user-create', loadChildren: './user-create/user-create.module#ScenarioCreateModule' },
      { path: 'user-edit/:login', loadChildren: './user-edit/user-edit.module#ScenarioEditModule' },
      { path: 'user-list', loadChildren: './user-list/user-list.module#ScenarioListModule' },
      { path: 'user-view/:login', loadChildren: './user-view/user-view.module#ScenarioViewModule' },
      { path: 'user-report', loadChildren: './user-report/user-report.module#ScenarioReportModule' },
      { path: '**', redirectTo: 'user-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    UserComponent,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {
}
