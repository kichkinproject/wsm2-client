import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorCreateComponent } from './integrator-create.component';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: IntegratorCreateComponent,
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
    IntegratorCreateComponent,
  ],
  declarations: [
    IntegratorCreateComponent,
  ],
})
export class IntegratorCreateModule {
}
