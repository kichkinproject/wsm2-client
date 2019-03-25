import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioEditComponent } from './scenario-edit.component';
import {Wsm2AccountService} from '../../../../services/wsm2-account.service';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import { LoaderModule } from "../../../../components/loader/loader.component";

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
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
    LoaderModule,
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
