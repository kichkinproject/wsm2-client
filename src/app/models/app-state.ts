import {Injectable, InjectionToken} from '@angular/core';
import { Utils } from '../utils/utils';
import { GUID } from './guid';

export interface IAppState {
  moniker: string;
  clientguid: string;
}

@Injectable( {
  providedIn: 'root'
})
export class AppState {
  private _clientguid: GUID;
  private _moniker: string;

  set moniker(moniker: string) {
    this._moniker = moniker;
    if (moniker) {
      localStorage.setItem('moniker', moniker);
    } else {
      localStorage.removeItem('moniker');
    }
  }

  get moniker(): string {
    if (Utils.exists(this._moniker)) {
      return this._moniker;
    }
    const moniker = localStorage.getItem('moniker');
    if (Utils.exists(moniker)) {
      this._moniker = moniker;
      return moniker;
    }
    return undefined;
  }

  set clientguid(clientguid: GUID) {
    this._clientguid = clientguid;
    if (Utils.exists(clientguid)) {
      sessionStorage.setItem('clientguid', clientguid.toString());
    } else {
      localStorage.removeItem('clientguid');
    }
  }

  get clientguid(): GUID {
    if (Utils.exists(this._clientguid)) {
      return this._clientguid;
    }
    const clientguid = localStorage.getItem('clientguid');
    if (Utils.exists(clientguid)) {
      this._clientguid = new GUID(clientguid);
      return this._clientguid;
    }
    this.clientguid = new GUID();
    // при генерации нового сохранять его в локалсторедж
    localStorage.setItem('clientguid', this._clientguid.toString());
    return this.clientguid;
  }
}
