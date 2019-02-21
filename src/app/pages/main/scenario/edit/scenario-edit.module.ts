import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioEditComponent } from './scenario-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioEditComponent,
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
    ScenarioEditComponent,
  ],
  declarations: [
    ScenarioEditComponent,
  ],
})
export class ScenarioEditModule {
}
