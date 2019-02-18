import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig, AppConfigToken } from '../app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Wsm2AccountService {
  constructor(protected http: HttpClient,
              protected appState: AppState,
              protected aclService: AclService,
              protected alertsService: AlertsService,
              @Inject(AppConfigToken) protected config: IAppConfig) {
    // super(http, appState, aclService, alertsService, config);
  }
}

