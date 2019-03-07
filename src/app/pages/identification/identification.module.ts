import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IdentificationComponent } from './identification.component';
import {Wsm2AccountService} from '../../services/wsm2-account-service';
import {MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: IdentificationComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Wsm2AccountService,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  exports: [
    IdentificationComponent,
  ],
  declarations: [
    IdentificationComponent,
  ],
})
export class IdentificationModule {
}
