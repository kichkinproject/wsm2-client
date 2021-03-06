import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig } from '../app.config';
import { AppConfigToken, AppStateToken } from "../models/token";
import {Observable, of} from 'rxjs';
import { AppState, IAppState } from "../models/app-state";
import {ApiService} from './api.service';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {forEach} from '@angular/router/src/utils/collection';
import {WsmData} from '../models/data';
import { Utils } from "../utils/utils";
import {LoginToken} from "../models/token";
import { filter, flatMap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WsmAccountService {
  private accountUrl = `${this.config.WebApiUrl}/account`;

  constructor(protected http: HttpClient,
              @Inject(AppStateToken) protected appState: IAppState,
              @Inject(AppConfigToken) protected config: IAppConfig
  ) {
    // super(http, appState, config);
  }

  public checkUser(login: string, password: string) {
    return fetch(this.accountUrl, {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  public getAccount() {
    return fetch(this.accountUrl + '/info', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  public refreshToken() {
    console.log(window.sessionStorage.getItem('refresh'));
    return fetch(this.accountUrl + '/refresh', {
      method: 'POST',
      body: JSON.stringify({
        token: window.sessionStorage.getItem('refresh')
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }
}
