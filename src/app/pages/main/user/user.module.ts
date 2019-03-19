import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { LoaderModule } from "../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'user-create', loadChildren: './user-create/user-create.module#UserCreateModule' },
      { path: 'user-edit/:login', loadChildren: './user-edit/user-edit.module#UserEditModule' },
      { path: 'user-list', loadChildren: './user-list/user-list.module#UserListModule' },
      { path: 'user-view/:login', loadChildren: './user-view/user-view.module#UserViewModule' },
      { path: 'user-report', loadChildren: './user-report/user-report.module#UserReportModule' },
      { path: '**', redirectTo: 'user-list' },
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
    UserComponent,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {
}
