import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter, map, retryWhen, tap } from 'rxjs/operators';
import { Utils } from '../utils/utils';
import { AppState } from '../models/app-state';
import { IAppConfig } from '../app.config';
import { ApiResponse, RequestResultStatus } from '../models/api-response';

@Injectable()
export class ApiService {
  protected url: string;
  private checkInterval: any;

  constructor(protected http: HttpClient,
              protected appState: AppState,
              @Inject('AppConfig') protected config: IAppConfig) {
    this.url = `${config.WebApiUrl}/api`;
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get(url, {headers: this.getHttpHeaders()})
      .pipe(
        tap((res: ApiResponse<T>) => this.catchApiErrors(res)),
        retryWhen(attempts => this.reconnectAndRetry(attempts)),
        filter((res: any) => res.status.type === RequestResultStatus.Success),
        map((res: ApiResponse<T>) => res.result),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public post<T>(url: string, object?: any, reconnect = true): Observable<T> {
    return this.http.post(url, object, {headers: this.getHttpHeaders()})
      .pipe(
        tap((res: ApiResponse<T>) => this.catchApiErrors(res)),
        retryWhen(attempts => this.reconnectAndRetry(attempts)),
        filter((res: any) => res.status.type === RequestResultStatus.Success),
        map((res: ApiResponse<T>) => res.result),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public put<T>(url: string, object: any): Observable<T> {
    return this.http.put(url, object, {headers: this.getHttpHeaders()})
      .pipe(
        tap((res: ApiResponse<T>) => this.catchApiErrors(res)),
        retryWhen(attempts => this.reconnectAndRetry(attempts)),
        filter((res: any) => res.status.type === RequestResultStatus.Success),
        map((res: ApiResponse<T>) => res.result),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public update(url: string, object: any, id: number): Observable<boolean> {
    return this.http.put(`${url}/${id}`, object, {headers: this.getHttpHeaders()})
      .pipe(
        tap((res: ApiResponse<boolean>) => this.catchApiErrors(res)),
        retryWhen(attempts => this.reconnectAndRetry(attempts)),
        filter((res: any) => res.status.type === RequestResultStatus.Success),
        map((res: ApiResponse<boolean>) => res.result),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public delete<T>(url: string, id: any): Observable<T> {
    return this.http.delete(`${url}/${id}`, {headers: this.getHttpHeaders()})
      .pipe(
        tap((res: ApiResponse<T>) => this.catchApiErrors(res)),
        retryWhen(attempts => this.reconnectAndRetry(attempts)),
        filter((res: any) => res.status.type === RequestResultStatus.Success),
        map((res: ApiResponse<T>) => res.result),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public fileDownload<T>(url: string): Observable<T> {
    return this.http.get(url, {headers: this.getHttpHeaders(), responseType: 'blob'})
      .pipe(
        filter((res: any) => res),
        catchError((error: any) => this.catchErrors(error))
      );

  }

  public fileDownloadPost<T>(url: string, object?: any): Observable<T> {
    return this.http.post(url, object, {headers: this.getHttpHeaders(), responseType: 'blob'})
      .pipe(
        filter((res: any) => res),
        catchError((error: any) => this.catchErrors(error))
      );
  }

  public loginPP(login: string, pass: string): Observable<string> {
    if (Utils.exists(login) || Utils.exists(pass)) {
      return this.post<string>(`${this.url}/Account/LoginPP`, {login: login, pass: pass})
        .pipe(
          tap((res: string) => {
            this.appState.moniker = res;
            this.startInterval();
          })
        );
    }

    return this.get<string>(`${this.url}/Account/LoginPP`)
      .pipe(
        tap((res: string) => {
          this.appState.moniker = res;
          this.startInterval();
        })
      );
  }

  public logOutPP(): Observable<string> {
    return this.post<string>(`${this.url}/Account/LogOutPP`, {});
  }

  public loginDomain(): Observable<string> {
    return this.get<string>(`${this.url}/Account/LoginDomain`)
      .pipe(
        tap((res: string) => {
          this.appState.moniker = res;
          this.startInterval();
        })
      );
  }

  public checkConn(moniker: string): Observable<boolean> {
    return this.post<boolean>(`${this.url}/Account/CheckConn/${moniker}`, {}, false)
      .pipe(
        tap((res) => {
          if (res) {
            this.startInterval();
          }
        })
      );
  }

  public checkConnAndReconnect(moniker: string): Observable<string> {
    return Observable.create(observer => {
      if (Utils.missing(moniker)) {
        this.loginDomain().subscribe(res => {
          observer.next(res);
          observer.complete();
          return () => {
          };
        });
      } else {
        this.checkConn(moniker).subscribe(res => {
          if (res) {
            observer.next(moniker);
            observer.complete();
          } else {
            this.loginDomain().subscribe(result => {
              observer.next(result);
              observer.complete();
              return () => {
              };
            });
          }
          return () => {
          };
        }, error => {
          this.loginDomain().subscribe(result => {
            observer.next(result);
            observer.complete();
            return () => {
            };
          });
        });
      }
    });
  }

  private getHttpHeaders(contentType = 'application/json; charset=utf-8'): HttpHeaders {
    let headers = {};
    if (Utils.exists(contentType)) {
      headers['Content-Type'] = contentType;
    }
    const moniker = this.appState.moniker;
    if (Utils.exists(moniker)) {
      headers['ppconn'] = moniker;
    }
    const guid = this.appState.clientguid;
    if (Utils.exists(guid)) {
      headers['clientguid'] = guid.toString();
    }
    return new HttpHeaders(headers);
  }

  private catchErrors(error: any): Observable<any> {
    let message = 'Ошибка сервера, подробности в логе браузера';
    if (Utils.exists(error)) {
      if (Utils.exists(error.json) && Utils.exists(error.json().error)) {
        message = error.json().error;
      }

      if (Utils.exists(error['status']) && error['status']['type'] === RequestResultStatus.Error) {
        message = error['status']['msg'];
      }

      if (Utils.exists(error['status']) && error['status']['type'] === RequestResultStatus.InvalidToken) {
        message = null;
      }
    }

    if (message) {
      // this.alertsService.error(message);
    }
    return Observable.throw(message);
  }

  private catchApiErrors(response: ApiResponse<any>) {
    if (response.status.type === RequestResultStatus.Error) {
      // this.alertsService.error(response.status.msg);
      throw response;
    } else if (response.status.type === RequestResultStatus.Warning) {
      // this.alertsService.warning(response.status.msg);
    } else if (response.status.type === RequestResultStatus.InvalidToken) {
      this.appState.moniker = null;
      throw response;
    }
  }

  private reconnectAndRetry(attempts: any, reconnect = true) {
    return attempts
      .flatMap((error) => {
        if (reconnect && Utils.exists(error) && Utils.exists(error.status)
          && error.status.type === RequestResultStatus.InvalidToken) {
          return this.loginDomain();
        }
        return Observable.throw(error);
      })
      .scan((acc, value) => acc + 1, 0)
      .takeWhile(acc => acc < 3)
      .delay(1000);
  }

  private filter(res: ApiResponse<any>): boolean {
    if (res.status.type === RequestResultStatus.Success ||
      res.status.type === RequestResultStatus.Warning) {
      return true;
    }

    throw res.status.msg;
  }

  private startInterval() {
    if (Utils.exists(this.checkInterval)) {
      clearInterval(this.checkInterval);
    }
    if (Utils.exists(this.appState.moniker)) {
      this.checkInterval = setInterval(() => {
        this.checkConnAndReconnect(this.appState.moniker).subscribe();
      }, 43200000); //12 часов
    }
  }
}
