import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'identificator',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent {
  private login: string = '';
  private password: string = '';
  public deny: boolean = false;
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

  public enabledLogin(): boolean {
    return (this.login !== '' && this.password !== '');
  }

  public tryIdentify() {
    // Отправляем в сервис логин и пароль пользователя на проверку
    let passed = false;
    if (passed) {
      // Запрос в сервис на юзера по логину
      console.log(`Пользователь с логином ${this.login} существует и пароль введен верно`);
      this.user = new User();
      this.user.login = this.login;
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
}
