import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LayoutLoaded } from './_state/actions/layout.actions';
import { State } from './_state';
import { Wsm2DataService } from './services/wsm2-data.service';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class AppResolverService implements Resolve<boolean> {
  constructor(private dataService: Wsm2DataService,
              private store: Store<State>) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return forkJoin(
    ).pipe(
      flatMap(dicts => {
        return of(true);
      }),
    );
  }
}
