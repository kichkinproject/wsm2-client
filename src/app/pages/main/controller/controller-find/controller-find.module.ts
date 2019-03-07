import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerFindComponent } from './controller-find.component';
import { LoaderModule } from "../../../../components/loader/loader.component";
import { MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule } from "@angular/material";

const routes: Routes = [
  {
    path: '',
    component: ControllerFindComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  exports: [
    ControllerFindComponent,
  ],
  declarations: [
    ControllerFindComponent,
  ],
})
export class ControllerFindModule {
}
