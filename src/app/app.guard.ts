import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import {Role} from './models/role';
import {AppConfig, IAppConfig, AppConfigToken} from './app.config';
import { LayoutSetUser } from './_state/actions/layout.actions';
import { GetCurrentUser, State } from './_state';
import { select, Store } from '@ngrx/store';

@Injectable()
export class AppGuard implements CanActivate {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);

  constructor(private router: Router,
              private accountService: KpiAccountService,
              private store: Store<State>,
              @Inject(AppConfigToken) protected config: AppConfig) {
    this.store.pipe(select(GetCurrentUser)).subscribe(user => this.$user.next(user));
  }
}
