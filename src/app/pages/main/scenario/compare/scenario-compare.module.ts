import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioCompareComponent } from './scenario-compare.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioCompareComponent,
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
    ScenarioCompareComponent,
  ],
  declarations: [
    ScenarioCompareComponent,
  ],
})
export class ScenarioCompareModule {
}
