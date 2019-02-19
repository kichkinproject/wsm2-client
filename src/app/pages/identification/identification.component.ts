import {Component, OnInit} from '@angular/core';
import { User } from '../../models/user';
import { Utils } from '../../utils/utils';
import { Wsm2AccountService } from '../../services/wsm2-account-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../_state';

@Component({
  selector: 'wsm-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {
  private login: string = '';
  private password: string = '';
  public deny = false;
  public user: User = null;



  public get login() {
    return this.login;
  }

  public get password() {
    return this.password;
  }

  public set login(log: string) {
    if (Utils.exists(log)) {
      this.login = _.escape(log);
      this.deny = false;
    }
  }

  public set password(pass: string) {
    if (Utils.exists(pass)) {
      this.password = _.escape(pass);
      this.deny = false;
    }
  }

  constructor(protected accountService: Wsm2AccountService,
              router: Router,
              activatedRoute: ActivatedRoute,
              store: Store<State>) {

  }

  public enabledLogin(): boolean {
    return (this.login !== '' && this.password !== '');
  }

  public tryIdentify() {
    // Отправляем в сервис логин и пароль пользователя на проверку
    const user = this.accountService.checkUser(this.login, this.password);
    if (Utils.exists(user)) {
      // Запрос в сервис на юзера по логину
      console.log(`Пользователь с логином ${this.login} существует и пароль введен верно`);
      this.identify();
    } else {
      console.log(`Пользователя с логином ${this.login} не существует или пароль введен неверно`);
      this.deny = true;
      this.user = null;
    }
  }

  public identify() {
    console.log(`${this.user.login} идентифицирован`);
  }

  public ngOnInit() {

  }
}
