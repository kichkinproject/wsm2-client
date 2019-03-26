import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig } from '../app.config';
import { AppConfigToken, AppStateToken } from "../models/token";
import { Observable } from 'rxjs';
import { AppState, IAppState } from "../models/app-state";
import {ApiService} from './api.service';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {forEach} from '@angular/router/src/utils/collection';
import {WsmData} from '../models/data';
import { Utils } from "../utils/utils";
import {LoginToken} from "../models/token";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class Wsm2AccountService {
  private accountUrl = `${this.config.WebApiUrl}/account`;

  constructor(protected http: HttpClient,
              @Inject(AppStateToken) protected appState: IAppState,
              @Inject(AppConfigToken) protected config: IAppConfig
  ) {
    // super(http, appState, config);
  }

  private source: WsmData = new WsmData();
  private data: User[] = this.source.allUsers();

  public checkUser(login: string, password: string): User {
    for (let i = 0; i < this.data.length; i++) {
      const user = this.data[i];
      if (user.login === login && user.password === password) {
        return user;
      }
    }
    return null;
  }

  public checkUser2(login, password): Observable<any> {
    return this.http.post(this.accountUrl, JSON.stringify({
      login: login,
      password: password
    }), httpOptions);
  }

  // // Запрос на получение пользователя по
  // public checkUser(): Observable<boolean> {
  //   // return this.
  // }

  // public getUserSettings(): Observable<any> {
  //   return this.post<any>(`${this.url}/LoadUserConfig`, {});
  // }
  //
  // public setUserSettings(body?: any): Observable<any> {
  //   return this.post<any>(`${this.url}/SaveUserConfig`, body);
  // }
  //
  // public currentUserInfo() {
  //   return this.post<any>(`${this.url}/GetUserInfo`);
  // }

  private userInfo(user: User) {
    return user.info;
  }

}

