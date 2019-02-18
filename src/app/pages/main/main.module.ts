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
import { MainGuard } from './main.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'identification', loadChildren: '../identification/identification.module#IdentificationModule' },
      { path: 'list', loadChildren: '../list/list.module#ListModule', canActivate: [MainGuard] },
      { path: 'edit', loadChildren: '../edit/edit.module#EditModule', canActivate: [MainGuard] },
      { path: 'create', loadChildren: '../create/create.module#CreateModule', canActivate: [MainGuard] },
      { path: 'view', loadChildren: '../view/view.module#ViewModule', canActivate: [MainGuard] },
      { path: '**', redirectTo: 'identification' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
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
