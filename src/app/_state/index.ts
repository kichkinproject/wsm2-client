import * as fromLayout from './reducers/layout.reducers';
import * as fromParams from './reducers/params.reducers';
import { RouterStateUrl } from './utils';
import { ReportParams } from '../models/report-params';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  layout: fromLayout.State;
  params: ReportParams;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  params: fromParams.reducer,
  routerReducer: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

export const getRouterState = createFeatureSelector('routerReducer');
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getParamsState = createFeatureSelector<ReportParams>('params');

export const GetConfig = createSelector(getLayoutState, fromLayout.GetConfig);
export const GetLoaded = createSelector(getLayoutState, fromLayout.GetLoaded);
export const GetCurrentUser = createSelector(getLayoutState, fromLayout.GetCurrentUser);
export const GetHeader = createSelector(getLayoutState, fromLayout.GetHeader);
export const GetTheme = createSelector(getLayoutState, fromLayout.GetTheme);
export const GetGoNext = createSelector(getLayoutState, fromLayout.GetGoNext);
export const GetGoBack = createSelector(getLayoutState, fromLayout.GetGoBack);
