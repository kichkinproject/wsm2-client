import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig, AppConfigToken } from '../app.config';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class Wsm2AccountService extends ApiService {
  private accountUrl = `${this.url}/Account`;

  constructor(protected http: HttpClient,
              protected appState: AppState,
              @Inject(AppConfigToken) protected config: IAppConfig) {
    // super(http, appState, aclService, alertsService, config);
    super(http, appState, config);
  }

  private data: User[] = [
    {
      login: 'admin_1',
      password: 'qwe123',
      name: 'First Admin',
      info: 'Some info about first admin',
      role: Roles.ADMIN
    },
    {
      login: 'main_1',
      password: '123qwewq321',
      name: 'First Main',
      info: 'Some info about first user',
      role: Roles.MAIN_ADMIN
    },
    {
      login: 'integrator_1',
      password: '12345',
      name: 'First Integrator',
      info: 'Some info about first user',
      role: Roles.INTEGRATOR
    },
    {
      login: 'integrator_2',
      password: '67890',
      name: 'Second Integrator',
      info: 'Some info about first user',
      role: Roles.INTEGRATOR
    },
    {
      login: 'user_1',
      password: 'qwe',
      name: 'First User',
      info: 'Some info about first user',
      role: Roles.SIMPLE
    },
    {
      login: 'user_2',
      password: 'asd',
      name: 'Second User',
      info: 'Some info about first user',
      role: Roles.SIMPLE
    },
    {
      login: 'user_3',
      password: 'zxc',
      name: 'Third User',
      info: 'Some info about first user',
      role: Roles.SIMPLE
    },
  ];

  public checkUser(login: string, password: string): User {
    for (let i = 0; i < this.data.length; i++) {
      const user = this.data[i];
      if (user.login === login && user.password === password) {
        return user;
      }
    }
    return null;
  }

  // // Запрос на получение пользователя по
  // public checkUser(): Observable<boolean> {
  //   // return this.
  // }

  public getUserSettings(): Observable<any> {
    return this.post<any>(`${this.url}/LoadUserConfig`, {});
  }

  public setUserSettings(body?: any): Observable<any> {
    return this.post<any>(`${this.url}/SaveUserConfig`, body);
  }

  private userInfo(user: User) {
    return user.info;
  }

}

