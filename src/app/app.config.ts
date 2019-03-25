import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { select, Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { GetConfig, State } from './_state';
import {LayoutSetConfig} from './_state/actions/layout.actions';
import {baseApi} from './models/api-urls';

export interface IAppConfig {
  ServerName: string;
  WebApiUrl: string;
  WebSocketUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class AppConfig implements IAppConfig {
  public get ServerName(): string {
    return this.getConfig('apiServer');
  }

  public get Protocol(): string {
    return this.getConfig('https') ? 'https' : 'http';
  }

  public get WebApiUrl(): string {
    return `${this.Protocol}://${this.ServerName}/{${baseApi}`;
  }

  public get WebSocketUrl(): string {
    return `${this.Protocol}://${this.ServerName}/`;
  }

  // public get

  private config = null;

  constructor(private http: HttpClient,
              private store: Store<State>) {
    this.store.pipe(select(GetConfig)).subscribe(config => this.config = config);
  }

  public load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`env.json`).pipe(
        catchError((error: any) => {
          console.error('Error reading ' + (environment.production ? 'production' : 'develop') + ' configuration file');
          return throwError(error.message || 'Server error');
        })
      ).subscribe((response: any) => {
        this.store.dispatch(new LayoutSetConfig(response));
        return resolve(true);
      });
    });
  }

  public getConfig(key: any): any {
    return this.config[key];
  }

  private setConfig(key: any, value: boolean): any {
    this.config[key] = value;
  }
}
