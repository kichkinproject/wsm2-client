import { IAppState } from './app-state';
import { InjectionToken } from '@angular/core';
import { IAppConfig } from '../app.config';

export const AppStateToken = new InjectionToken<IAppState>('AppState');
export const AppConfigToken = new InjectionToken<IAppConfig>('AppConfig');

export class LoginToken {
  access: string;
  refresh: string;

  constructor(access: string, refresh: string) {
    this.access = access;
    this.refresh = refresh;
  }
}
