import { Component, Inject, OnInit } from "@angular/core";
import { User } from '../../models/user';
import { Utils } from '../../utils/utils';
import { Wsm2AccountService } from '../../services/wsm2-account.service';
import { Wsm2DataService } from "../../services/wsm2-data.service";
import { WsmAccountService } from '../../services/wsm-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../_state";
import { BehaviorSubject, Subscription } from "rxjs";
import {Role, Roles} from '../../models/role';
import * as _ from "lodash";
import {LayoutLoaded, LayoutSetUser} from '../../_state/actions/layout.actions';
import { LoginToken } from "../../models/token";
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'wsm-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  private $login: string = '';
  private $password: string = '';
  public $deny = false;
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  private subscriptions: Subscription[] = [];

  public get login() {
    return this.$login;
  }

  public get password() {
    return this.$password;
  }

  public set login(log: string) {
    if (Utils.exists(log)) {
      this.$login = _.escape(log);
      this.deny = false;
    }
  }

  public set password(pass: string) {
    if (Utils.exists(pass)) {
      this.$password = _.escape(pass);
      this.deny = false;
    }
  }

  public get deny() {
    return this.$deny;
  }

  public set deny(res: boolean) {
    this.$deny = res;
  }

  constructor(private router: Router,
              private store: Store<State>,
              private accService: WsmAccountService,
              private accountService: Wsm2AccountService,
              private dataService: Wsm2DataService) {
    this.store.pipe(select(GetCurrentUser)).subscribe(() => this.$user.next(null));
    // this.subscriptions.push(
    //   this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    // );
    this.store.dispatch(new LayoutLoaded(true));

  }

  public enabledLogin(): boolean {
    return (this.$login !== '' && this.$password !== '');
  }

  public tryIdentify() {
    // Отправляем в сервис логин и пароль пользователя на проверку
    const user = this.accountService.checkUser(this.$login, this.$password);
    // const token = this.accountService.checkUser2(this.$login, this.$password);
    // this.accService.checkUser2(this.$login, this.$password)
    //   .pipe(flatMap((res: any) => {
    //     console.log(res);
    //     window.sessionStorage.setItem('access', res.accessToken);
    //     window.sessionStorage.setItem('refresh', res.refreshToken);
    //     console.log(sessionStorage);
    //     return res;
    //   })).pipe(flatMap(() => this.accService.getAccount2()))
    //   .pipe(flatMap((res: any) => {
    //     this.identify({
    //       login: res.Login,
    //       name: res.FIO,
    //       role: res.Login === 'system_author' && res.Role === 'Admin'
    //         ? Roles.MAIN_ADMIN
    //         : res.Role === 'Admin'
    //           ? Roles.ADMIN
    //           : res.Role === 'Integrator'
    //             ? Roles.INTEGRATOR
    //             : res.Role === 'SimpleUser'
    //               ? Roles.SIMPLE : Roles.NONE
    //     });
    //     return res;
    //   }));


    this.accService.checkUser(this.$login, this.$password)
      .then(function(authentication) {
        console.log(authentication);
        window.sessionStorage.setItem('access', authentication.accessToken);
        window.sessionStorage.setItem('refresh', authentication.refreshToken);
        console.log(sessionStorage);
        return authentication;
    }).then((response) => this.accService.getAccount())
      .then((response) => {
          const role = new Role({
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
          this.router.navigate(['/main/about']);
      })
      .catch(function(error) {
        console.log(error);
      });

    // if (Utils.exists(window.sessionStorage.getItem('token'))) {
    //
    // } else {
    //     alert(`Пользователя с логином ${this.$login} не существует или пароль введен неверно`);
    // }
    // if (Utils.exists(user)) {
    //   // Запрос в сервис на юзера по логину
    //   console.log(`Пользователь с логином ${this.$login} существует и пароль введен верно`);
    //   this.identify(user);
    // } else {
    //   console.log(`Пользователя с логином ${this.$login} не существует или пароль введен неверно`);
    //   this.deny = true;
    //   this.$user = null;
    // }
    // if (Utils.exists(token)) {
    //   // Запрос в сервис на юзера по логину
    //   console.log(`Пользователь с логином ${this.$login} существует и пароль введен верно`);
    //   this.identify2(token);
    // } else {
    //   console.log(`Пользователя с логином ${this.$login} не существует или пароль введен неверно`);
    //   this.deny = true;
    //   this.$user = null;
    // }
    // if (Utils.exists(token)) {
    //   // Запрос в сервис на юзера по логину
    //   console.log(`Пользователь с логином ${this.$login} существует и пароль введен верно`);
    //   this.identify2(token);
    // } else {
    //   console.log(`Пользователя с логином ${this.$login} не существует или пароль введен неверно`);
    //   this.deny = true;
    //   this.$user = null;
    // }
  }

  private identify(model: any) {
    const role = new Role(model);
    this.store.dispatch(new LayoutSetUser(role));
    console.log(`${this.$login} идентифицирован`);
    this.router.navigate(['/main/about']);
  }

  // private identify2(token: LoginToken) {
  //   const user = new User();
  //   const role = new Role(user);
  //   this.store.dispatch(new LayoutSetUser(role));
  //   console.log(`${this.$login} идентифицирован`);
  //   this.router.navigate(['/main/about']);
  // }

  public ngOnInit() {

  }
}
