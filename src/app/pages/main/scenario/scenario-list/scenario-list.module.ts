import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScenarioListComponent } from './scenario-list.component';
import {Wsm2AccountService} from '../../../../services/wsm2-account.service';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
  {
    path: '',
    component: ScenarioListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ScrollingModule,
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
    ScenarioListComponent,
  ],
  declarations: [
    ScenarioListComponent,
  ],
})
export class ScenarioListModule {
}
