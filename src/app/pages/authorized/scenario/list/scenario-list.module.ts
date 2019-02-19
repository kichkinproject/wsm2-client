import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioListComponent } from './scenario-list.component';

const routes: Routes = [
  {
    path: '',
    component: ScenarioListComponent,
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
    ScenarioListComponent,
  ],
  declarations: [
    ScenarioListComponent,
  ],
})
export class ScenarioListModule {
}
