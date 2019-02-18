import { ParamsActions, ParamsActionTypes } from '../actions/params.actions';
import { ReportParams } from '../../models/report-params';

export const initialState: ReportParams = {};

export function reducer(state = initialState, action: ParamsActions): ReportParams {
  switch (action.type) {
    case ParamsActionTypes.ParamsLoad: {
      return state;
    }
    case ParamsActionTypes.ParamsSetParams: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}

export const GetParams = (state: ReportParams) => state;

