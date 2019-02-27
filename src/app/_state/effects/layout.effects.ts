import { Injectable } from '@angular/core';
import { LayoutActionTypes } from '../actions/layout.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class LayoutEffects {

  @Effect()
  effect$ = this.actions$.pipe(ofType(LayoutActionTypes.LayoutLoaded));

  constructor(private actions$: Actions) {}
}
