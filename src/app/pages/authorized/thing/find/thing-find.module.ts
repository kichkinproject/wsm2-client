import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThingFindComponent } from './thing-find.component';

const routes: Routes = [
  {
    path: '',
    component: ThingFindComponent,
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
    ThingFindComponent,
  ],
  declarations: [
    ThingFindComponent,
  ],
})
export class ThingFindModule {
}
