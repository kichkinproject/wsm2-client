import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioCreateComponent } from './scenario-create.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioCreateComponent,
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
    ScenarioCreateComponent,
  ],
  declarations: [
    ScenarioCreateComponent,
  ],
})
export class ScenarioCreateModule {
}
