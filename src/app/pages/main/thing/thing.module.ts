import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThingComponent } from './thing.component';

const routes: Routes = [
  {
    path: '',
    component: ThingComponent,
    children: [
      { path: 'thing-find', loadChildren: './find/thing-find.module#ThingFindModule' },
      { path: 'thing-list', loadChildren: './list/thing-list.module#ThingListModule' },
      { path: 'thing-view', loadChildren: './view/thing-view.module#ThingViewModule' },
      { path: '**', redirectTo: 'thing-list' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    ThingComponent,
  ],
  declarations: [
    ThingComponent,
  ],
})
export class ThingModule {
}
