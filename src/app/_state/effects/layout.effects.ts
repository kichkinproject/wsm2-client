import { Injectable } from '@angular/core';
import { LayoutActionTypes } from '../actions/layout.actions';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class LayoutEffects {

  @Effect()
  effect$ = this.actions$.ofType(LayoutActionTypes.LayoutLoaded);

  constructor(private actions$: Actions) {}
}
