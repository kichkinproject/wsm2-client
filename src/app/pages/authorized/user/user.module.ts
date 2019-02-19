import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'create', loadChildren: './create/user-create.module#ScenarioCreateModule' },
      { path: 'edit', loadChildren: './edit/user-edit.module#ScenarioEditModule' },
      { path: 'list', loadChildren: './list/user-list.module#ScenarioListModule' },
      { path: 'view', loadChildren: './view/user-view.module#ScenarioViewModule' },
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
    UserComponent,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {
}
