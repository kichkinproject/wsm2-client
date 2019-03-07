import {Inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Role} from '../../models/role';
import {Wsm2AccountService} from '../../services/wsm2-account-service';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../_state';
import {AppConfig, IAppConfig } from '../../app.config';
import {AppConfigToken} from '../../models/token';
import {Utils} from '../../utils/utils';


@Injectable()
export class MainGuard implements CanActivate {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);

  constructor(private router: Router,
              private accountService: Wsm2AccountService,
              private store: Store<State>,
              // @Inject(AppConfigToken) protected config: AppConfig
  ) {
    this.store.pipe(select(GetCurrentUser)).subscribe(user => this.$user.next(user));
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (Utils.exists(this.$user.getValue()) && this.$user.getValue().hasAccess()) {
      return of(true);
    } else {
      this.router.navigate(['/identification']);
      return of(true);
    }
  }
}
