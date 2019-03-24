import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";
import { ScenarioControllerLinkComponent } from "./scenario-controller-link.component";

const routes: Routes = [
  {
    path: '',
    component: ScenarioControllerLinkComponent,
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
    ScenarioControllerLinkComponent,
  ],
  declarations: [
    ScenarioControllerLinkComponent,
  ],
})
export class ScenarioControllerLinkModule {
}
