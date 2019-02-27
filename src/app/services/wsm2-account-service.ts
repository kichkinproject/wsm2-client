import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig, AppConfigToken } from '../app.config';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class Wsm2AccountService extends ApiService {
  private accountUrl = `${this.url}/Account`;

  constructor(protected http: HttpClient,
              protected appState: AppState,
              @Inject(AppConfigToken) protected config: IAppConfig) {
    // super(http, appState, aclService, alertsService, config);
    super(http, appState, config);
  }

  private data: User[] = [
    {
      login: 'system_author',
      password: '123qwewq321',
      name: 'First Main',
      info: 'Some info about first main admin',
      role: Roles.MAIN_ADMIN,
      group: -1
    },
    {
      login: 'admin_Ivan',
      password: 'qwe123',
      name: 'Иван Иванов',
      info: 'Номер телефона: 254-23-12',
      role: Roles.ADMIN,
      group: -1
    },
    {
      login: 'admin_Petr',
      password: 'qwe1234',
      name: 'Петр Петров',
      info: 'Номер телефона: 8-909-342-94-00',
      role: Roles.ADMIN,
      group: -1
    },
    {
      login: 'admin_Semen',
      password: 'qwe12345',
      name: 'Семен Семенов',
      info: 'Номер телефона: 215-32-12. После 20:00 не беспокоить.',
      role: Roles.ADMIN,
      group: -1
    },
    {
      login: 'integrator_Valentin',
      password: '12345',
      name: 'Валентин Воробушкин',
      info: 'Сценарии на любой вкус и цвет.',
      role: Roles.INTEGRATOR,
      group: 1
    },
    {
      login: 'integrator_Vasya',
      password: '54321',
      name: 'Василий Пупочкин',
      info: 'Номер телефона: 8-932-843-12-12.',
      role: Roles.INTEGRATOR,
      group: 2
    },
    {
      login: 'integrator_Tenechka',
      password: 'qwerty',
      name: 'Татьяна Данилова',
      info: 'Адрес почты: tanya.dan@mail.ru',
      role: Roles.INTEGRATOR,
      group: 3
    },
    {
      login: 'integrator_Olga',
      password: 'qazwsx',
      name: 'Ольга Шишкина',
      info: 'Номер телефона: 8-902-113-23-76. Не беспокоить в выходные и праздничные дни.',
      role: Roles.INTEGRATOR,
      group: 4
    },
    {
      login: 'integrator_Kirill',
      password: '1q2w3e',
      name: 'Кирилл Залесский',
      info: 'Какая-то полезная информация об интеграторе',
      role: Roles.INTEGRATOR,
      group: 5
    },
    {
      login: 'integrator_Yurka',
      password: '09876',
      name: 'Юрий Никулин',
      info: 'Еще более полезная информация об интеграторе',
      role: Roles.INTEGRATOR,
      group: 6
    },
    {
      login: 'user_papa_Sidorov',
      password: 'zxc',
      name: 'Андрей Сидоров',
      info: 'Глава дружной семьи Сидоровых.',
      role: Roles.SIMPLE,
      group: 2
    },
    {
      login: 'user_mama_Sidorov',
      password: 'zxc1',
      name: 'Елена Сидорова',
      info: 'Любящая жена и мама.',
      role: Roles.SIMPLE,
      group: 2
    },
    {
      login: 'user_son_Sidorov',
      password: 'zxc12',
      name: 'Иван Сидоров',
      info: 'Шестиклассник. Не люблю биологию.',
      role: Roles.SIMPLE,
      group: 2
    },
    {
      login: 'user_papa_Banan',
      password: 'mnb123',
      name: 'Владимир Банан',
      info: 'Номер телефона: 8-908-345-98-78',
      role: Roles.SIMPLE,
      group: 3
    },
    {
      login: 'user_mama_Banan',
      password: 'mnb12345',
      name: 'Анна Банан',
      info: 'Номер телефона: 8-912-764-00-56',
      role: Roles.SIMPLE,
      group: 3
    },
    {
      login: 'user_apteka',
      password: 'apteka123',
      name: 'Ирина Морозова',
      info: 'Фармацевт аптеки Планета здоровья ул. Мира, дом 15',
      role: Roles.SIMPLE,
      group: 4
    },
    {
      login: 'user_cafe',
      password: 'cafe1234',
      name: 'Алина Андреева',
      info: 'Администратор кафе на Мира, дом 12',
      role: Roles.SIMPLE,
      group: 5
    },
    {
      login: 'user_magaz',
      password: 'zapch12',
      name: 'Анатолий Костенецкий',
      info: 'Администратор магазина автозапчетестей на Мира, дом 17А',
      role: Roles.SIMPLE,
      group: 6
    },
  ];

  public checkUser(login: string, password: string): User {
    for (let i = 0; i < this.data.length; i++) {
      const user = this.data[i];
      if (user.login === login && user.password === password) {
        return user;
      }
    }
    return null;
  }

  // // Запрос на получение пользователя по
  // public checkUser(): Observable<boolean> {
  //   // return this.
  // }

  public getUserSettings(): Observable<any> {
    return this.post<any>(`${this.url}/LoadUserConfig`, {});
  }

  public setUserSettings(body?: any): Observable<any> {
    return this.post<any>(`${this.url}/SaveUserConfig`, body);
  }

  public currentUserInfo() {
    return this.post<any>(`${this.url}/GetUserInfo`);
  }

  private userInfo(user: User) {
    return user.info;
  }

}

