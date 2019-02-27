import { Component, Inject, OnInit } from "@angular/core";
import { User } from '../../models/user';
import { Utils } from '../../utils/utils';
import { Wsm2AccountService } from '../../services/wsm2-account-service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../_state";
import { BehaviorSubject, Subscription } from "rxjs";
import { Role } from "../../models/role";
import * as _ from "lodash";

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
      this.$deny = false;
    }
  }

  public set password(pass: string) {
    if (Utils.exists(pass)) {
      this.$password = _.escape(pass);
      this.$deny = false;
    }
  }

  constructor(private router: Router,
              private store: Store<State>,
              private accountService: Wsm2AccountService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  public enabledLogin(): boolean {
    return (this.$login !== '' && this.$password !== '');
  }

  public tryIdentify() {
    // Отправляем в сервис логин и пароль пользователя на проверку
    const user = this.accountService.checkUser(this.$login, this.$password);
    if (Utils.exists(user)) {
      // Запрос в сервис на юзера по логину
      console.log(`Пользователь с логином ${this.$login} существует и пароль введен верно`);
      this.identify();
    } else {
      console.log(`Пользователя с логином ${this.$login} не существует или пароль введен неверно`);
      this.$deny = true;
      this.$user = null;
    }
  }

  public identify() {
    console.log(`${this.$user.getValue().user_login} идентифицирован`);
  }

  public ngOnInit() {

  }
}
