import { Action } from '@ngrx/store';
import { ReportParams } from '../../models/report-params';

export enum ParamsActionTypes {
  ParamsLoad = '[Params] Load',
  ParamsSetParams = '[Params] Set Params',
}

export class Params implements Action {
  readonly type = ParamsActionTypes.ParamsLoad;
}

export class ParamsSetParams implements Action {
  readonly type = ParamsActionTypes.ParamsSetParams;

  constructor(public payload: ReportParams) {
  }
}

export type ParamsActions = Params
  | ParamsSetParams;
