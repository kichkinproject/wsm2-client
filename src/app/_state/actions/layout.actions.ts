import { Role } from '../../models/role';
import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  LayoutAction = '[Layout] Action',
  LayoutSetConfig = '[Layout] Set Config',
  LayoutSetHeader = '[Layout] Set Header',
  LayoutSetUser = '[Layout] Set User',
  LayoutLoaded = '[Layout] Data Loaded',
}

export class Layout implements Action {
  readonly type = LayoutActionTypes.LayoutAction;
}

export class LayoutSetConfig implements Action {
  readonly type = LayoutActionTypes.LayoutSetConfig;

  constructor(public payload: any) {
  }
}

export class LayoutSetHeader implements Action {
  readonly type = LayoutActionTypes.LayoutSetHeader;

  constructor(public payload: string) {
  }
}

export class LayoutSetUser implements Action {
  readonly type = LayoutActionTypes.LayoutSetUser;

  constructor(public payload: Role) {
  }
}

export class LayoutLoaded implements Action {
  readonly type = LayoutActionTypes.LayoutLoaded;

  constructor(public payload: boolean) {
  }
}

export type LayoutActions =
  Layout
  | LayoutSetConfig
  | LayoutSetHeader
  | LayoutSetUser
  | LayoutLoaded
;

