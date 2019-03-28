import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import {Role, Roles} from './models/role';
import {AppConfig, IAppConfig } from './app.config';
import { AppConfigToken } from "./models/token";
import { LayoutSetUser } from './_state/actions/layout.actions';
import { GetCurrentUser, State } from './_state';
import { select, Store } from '@ngrx/store';
import { Wsm2AccountService } from './services/wsm2-account.service';
import {Utils} from './utils/utils';
import {WsmAccountService} from './services/wsm-account.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);

  constructor(private router: Router,
              private accountService: Wsm2AccountService,
              private accService: WsmAccountService,
              private store: Store<State>,
              @Inject(AppConfigToken) protected config: AppConfig
  ) {
    this.store.pipe(select(GetCurrentUser)).subscribe(user => this.$user.next(user));
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let role = this.$user.getValue();
    console.log(window.sessionStorage);
    if (!role || !role.hasAccess()) {
      if (Utils.exists(window.sessionStorage.getItem('access')) || Utils.exists(window.sessionStorage.getItem('refresh'))) {
        this.accService.getAccount()
          .then((response) => {
            role = new Role({
              login: response.login,
              name: response.fio,
              role: response.login === 'system_author' && response.role === 'Admin'
                ? Roles.MAIN_ADMIN
                : response.role === 'Admin'
                  ? Roles.ADMIN
                  : response.role === 'Integrator'
                    ? Roles.INTEGRATOR
                    : response.role === 'SimpleUser'
                      ? Roles.SIMPLE : Roles.NONE
            });
            this.store.dispatch(new LayoutSetUser(role));
            console.log(`${role.user_login} идентифицирован`);
            if (this.router.url.indexOf('identification') !== -1) {
              this.router.navigate(['/main/about']);
            } else {
              this.router.navigate([this.router.url]);
            }
          }).catch((reject) => {
          if (Utils.exists(window.sessionStorage.getItem('refresh'))) {
            this.accService.refreshToken()
              .then((response) => {
                console.log(response);
                window.sessionStorage.setItem('access', response.accessToken);
                window.sessionStorage.setItem('refresh', response.refreshToken);
                console.log(sessionStorage);
                return response;
              })
              .then((response) => {
                console.log(`${role.user_login} переидентифицирован`);
                if (this.router.url.indexOf('identification') !== -1) {
                  this.router.navigate(['/main/about']);
                } else {
                  this.router.navigate([this.router.url]);
                }
                // this.router.navigate(this.router.);
                // this.router.navigate(['/main/about']);
              });
          } else {
            alert('Ошибка идентификации');
            this.router.navigate(['/identification']);
          }
          // TODO: Допилить refreshToken
          // console.log(error);
        });
      } else {
        console.log(window.sessionStorage);
        this.router.navigate(['/identification']);
      }
    } else {
      return of(true);
    }
  }
}
