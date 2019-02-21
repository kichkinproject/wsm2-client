import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThingListComponent } from './thing-list.component';

const routes: Routes = [
  {
    path: '',
    component: ThingListComponent,
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
    ThingListComponent,
  ],
  declarations: [
    ThingListComponent,
  ],
})
export class ThingListModule {
}
