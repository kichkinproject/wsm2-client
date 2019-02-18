import { ToLink } from '../../models/to-link';
import { Role } from '../../models/role';
import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  LayoutAction = '[Layout] Action',
  LayoutSetConfig = '[Layout] Set Config',
  LayoutSetHeader = '[Layout] Set Header',
  LayoutSetUser = '[Layout] Set User',
  LayoutLoaded = '[Layout] Data Loaded',
  LayoutSetGoBack = '[Layout] Set Go Back',
  LayoutSetGoNext = '[Layout] Set Go Next',
  LayoutSetTheme = '[Layout] Set Theme',
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

export class LayoutSetGoBack implements Action {
  readonly type = LayoutActionTypes.LayoutSetGoBack;

  constructor(public payload: ToLink | null) {
  }
}

export class LayoutSetGoNext implements Action {
  readonly type = LayoutActionTypes.LayoutSetGoNext;

  constructor(public payload: ToLink | null) {
  }
}

export class LayoutSetTheme implements Action {
  readonly type = LayoutActionTypes.LayoutSetTheme;

  constructor(public payload: string) {
  }
}

export type LayoutActions =
  Layout
  | LayoutSetConfig
  | LayoutSetHeader
  | LayoutSetUser
  | LayoutLoaded
  | LayoutSetGoBack
  | LayoutSetGoNext
  | LayoutSetTheme
;

