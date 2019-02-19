import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThingViewComponent } from './thing-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThingViewComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ThingViewComponent,
  ],
  declarations: [
    ThingViewComponent,
  ],
})
export class ThingViewModule {
}
