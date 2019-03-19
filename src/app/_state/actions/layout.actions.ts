import { Role } from '../../models/role';
import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  LayoutAction = '[Layout] Action',
  LayoutSetConfig = '[Layout] Set Config',
  LayoutSetHeader = '[Layout] Set Header',
  LayoutSetPageLoaded = '[Layout] Page Loaded',
  LayoutSetUser = '[Layout] Set User',
  LayoutSetTheme = '[Layout] Set Theme',
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

export class LayoutSetPageLoaded implements Action {
  readonly type = LayoutActionTypes.LayoutSetPageLoaded;

  constructor(public payload: boolean) {
  }
}

export class LayoutSetUser implements Action {
  readonly type = LayoutActionTypes.LayoutSetUser;

  constructor(public payload: Role) {
  }
}

export class LayoutSetTheme implements Action {
  readonly type = LayoutActionTypes.LayoutSetTheme;

  constructor(public payload: string) {
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
  | LayoutSetTheme
  | LayoutLoaded
  | LayoutSetPageLoaded
;

