import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThingComponent } from './thing.component';

const routes: Routes = [
  {
    path: '',
    component: ThingComponent,
    children: [
      { path: 'thing-find', loadChildren: './thing-find/thing-find.module#ThingFindModule' },
      { path: 'thing-list', loadChildren: './thing-list/thing-list.module#ThingListModule' },
      { path: 'thing-view/:id', loadChildren: './thing-view/thing-view.module#ThingViewModule' },
      { path: 'thing-report', loadChildren: './thing-report/thing-report.module#ThingReportModule' },
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
