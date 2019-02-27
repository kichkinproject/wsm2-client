import { Injectable } from '@angular/core';
import { ParamsActionTypes } from '../actions/params.actions';
import { Actions, Effect, ofType  } from '@ngrx/effects';

@Injectable()
export class ParamsEffects {

  @Effect()
  effect$ = this.actions$.pipe(ofType(ParamsActionTypes.ParamsLoad));

  constructor(private actions$: Actions) {}
}
