import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioCreateComponent } from './scenario-create.component';
import {MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import { LoaderModule } from "../../../../components/loader/loader.component";
// import {BlocklyModule} from "../../../../components/blockly/blockly.component";

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
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    LoaderModule,
  ],
  exports: [
    ScenarioCreateComponent,
  ],
  declarations: [
    ScenarioCreateComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ScenarioCreateModule {
}
