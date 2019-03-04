import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import {Role} from './models/role';
import {AppConfig, IAppConfig } from './app.config';
import { AppConfigToken } from "./models/token";
import { LayoutSetUser } from './_state/actions/layout.actions';
import { GetCurrentUser, State } from './_state';
import { select, Store } from '@ngrx/store';
import { Wsm2AccountService } from './services/wsm2-account-service';
import {Utils} from './utils/utils';

@Injectable()
export class AppGuard implements CanActivate {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);

  constructor(private router: Router,
              private accountService: Wsm2AccountService,
              private store: Store<State>,
              @Inject(AppConfigToken) protected config: AppConfig) {
    this.store.pipe(select(GetCurrentUser)).subscribe(user => this.$user.next(user));
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
    //
    // if (!this.$user.getValue()) {
    //   this.router.navigate(['/identification']);
    // } else {
    //   return of(true);
    // }
    // if (!this.$user.getValue()) {
    //   return this.accountService.currentUserInfo().pipe(
    //     flatMap(user => {
    //       return this.setUser(user);
    //     }));
    // } else {
    //   return of(true);
    // }
  }

  private setUser(user: any): Observable<boolean> {
    const role = new Role(user);
    return this.accountService.getUserSettings().pipe(
      flatMap((settings: string) => {
        // role.settings = Utils.exists(settings) ? JSON.parse(settings) : {};
        this.store.dispatch(new LayoutSetUser(role));
        return of(true);
      }),
    );
  }
}
