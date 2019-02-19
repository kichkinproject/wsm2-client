import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioViewComponent } from './scenario-view.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioViewComponent,
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
    ScenarioViewComponent,
  ],
  declarations: [
    ScenarioViewComponent,
  ],
})
export class ScenarioViewModule {
}
