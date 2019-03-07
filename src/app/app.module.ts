import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppConfig } from './app.config';
import { Wsm2AccountService } from './services/wsm2-account-service';
import { AppState } from './models/app-state';
import {AppConfigToken, AppStateToken} from './models/token'
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './_state/utils';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './_state';
import {SelectionPanelComponent, SelectionPanelModule} from './components/selection-panel/selection-panel.component';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export function appInit(config: AppConfig) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    (!environment.production) ? StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }) : [],
  ],
  bootstrap: [AppComponent],
  providers: [
    Wsm2AccountService,
    // {
    //   provide: AppConfigToken,
    //   useClass: AppConfig,
    // },
    // {
    //   provide: AppStateToken,
    //   useClass: AppState,
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInit,
    //   deps: [AppConfig],
    //   multi: true,
    // },
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    {
      provide: 'Legacy',
      useValue: false,
    },
  ],
})
export class AppModule { }
