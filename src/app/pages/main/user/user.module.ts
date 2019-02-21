import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'user-create', loadChildren: './create/user-create.module#ScenarioCreateModule' },
      { path: 'user-edit', loadChildren: './edit/user-edit.module#ScenarioEditModule' },
      { path: 'user-list', loadChildren: './list/user-list.module#ScenarioListModule' },
      { path: 'user-view', loadChildren: './view/user-view.module#ScenarioViewModule' },
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
