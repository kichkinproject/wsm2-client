import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAppConfig, AppConfigToken } from '../app.config';
import { Observable } from 'rxjs';
import { AppState } from '../models/app-state';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {forEach} from '@angular/router/src/utils/collection';
import { Scenario } from "../models/scenario";
import { ControllerType, ScenarioType, SensorType, ThingType } from "../models/entity-type";
import { Sensor } from "../models/sensor";
import { Thing } from "../models/thing";
import { Utils } from "../utils/utils";
import { Controller } from "../models/controller";
import { UserGroup } from "../models/user-group";

@Injectable({
  providedIn: 'root'
})
export class Wsm2DataService extends ApiService {
  constructor(protected http: HttpClient,
              protected appState: AppState,
              @Inject(AppConfigToken) protected config: IAppConfig) {
    // super(http, appState, aclService, alertsService, config),
    super(http, appState, config);
  }

  private $scenarioData: Scenario[] = [
    {
      id: 1,
      name: 'Сценарий - Электроэнергия ночь',
      description: 'С 23:30 до 06:00 свет не включается при движении, можно включить только руками.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: true,
      creator: ''
    },
    {
      id: 2,
      name: 'Сценарий - Электроэнергия день',
      description: 'С 9:00 до 18:00 в будние дни свет не включается при движении, можно включить только руками.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: true,
      creator: ''
    },
    {
      id: 3,
      name: 'Сценарий - Тепло',
      description: 'Сценарий включения тепла при достижении 18 градусов в помещении',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SENSOR_ACTION,
      publicity: true,
      creator: ''
    },
    {
      id: 4,
      name: 'Сценарий - управление водонагревателем',
      description: 'Сценарий управления водонагревателем по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: true,
      creator: ''
    },
    {
      id: 5,
      name: 'Сценарий - управление сигнализацией',
      description: 'Сценарий управления сигнализацией по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: true,
      creator: ''
    },
    {
      id: 6,
      name: 'Сценарий Сидоровы Интернет',
      description: 'Сценарий включает родительский контроль для интернета и каналов по телевизору',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 'integrator_Vasya'
    },
    {
      id: 7,
      name: 'Сценарий Сидоровы Теплый пол',
      description: 'Сценарий включает теплый пол в будние дни в 14:00 (за полчаса до прихода ребенка из школы)',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 'integrator_Vasya'
    },
    {
      id: 8,
      name: 'Сценарий Банан Вода',
      description: 'Сценарий перекрытия воды',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION ,
      publicity: false,
      creator: 'integrator_Tenechka'
    },
    {
      id: 9,
      name: 'Сценарий Банан Чайник',
      description: 'Сценарий управления чайником по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 'integrator_Tenechka'
    },
    {
      id: 10,
      name: 'Сценарий свет на лестничной клетке',
      description: 'Сценарий управления светом на лестничной клетке по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 'integrator_Valentin'
    },
    {
      id: 11,
      name: 'Сценарий - Аптека электроэнергия',
      description: 'Сценарий отключения электроприборов кроме холодильников в аптеке в период с 23:00 до 08:00',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: false,
      creator: 'integrator_Olga'
    },
    {
      id: 12,
      name: 'Сценарий - Вывеска',
      description: 'Сценарий управления вывеской - с 9:00 до 18:00 в будние дни свет вывеска не горит.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: false,
      creator: 'integrator_Olga'
    },
    {
      id: 13,
      name: 'Сценарий - Вода Кафе',
      description: 'Сценарий управления горячей водой - повторный нагрев воды в водонагревателе, если она остынет до 10 градусов',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SENSOR_ACTION,
      publicity: false,
      creator: 'integrator_Kirill'
    },
    {
      id: 14,
      name: 'Сценарий - управление водонагревателем',
      description: 'Сценарий управления водонагревателем по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 'integrator_Kirill'
    },
    {
      id: 15,
      name: 'Сценарий - управление вентиляцией',
      description: 'Сценарий управления вентиляцией по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 'integrator_Yurka'
    },
    {
      id: 16,
      name: 'Сценарий - управление сигнализацией',
      description: 'Сценарий включает сигнализацию в 19:00 и отключает в 10:00 в будние дни',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 'integrator_Yurka'
    },
  ];

  private $sensorData: Sensor[] = [
    {
      id: 1,
      name: 'Датчик влажности',
      description: 'Датчик влажности',
      type: SensorType.SENSOR_TYPE_1,
      master: 1,
    },
    {
      id: 2,
      name: 'Датчик движения',
      description: 'Датчик движения',
      type: SensorType.SENSOR_TYPE_2,
      master: 2,
    },
    {
      id: 3,
      name: 'Датчик температуры',
      description: 'Датчик температуры',
      type: SensorType.SENSOR_TYPE_3,
      master: 3,
    },
    {
      id: 4,
      name: 'Датчик света',
      description: 'Датчик света',
      type: SensorType.SENSOR_TYPE_4,
      master: 4,
    },
    {
      id: 5,
      name: 'Датчик влажности',
      description: 'Датчик влажности Сидоровых',
      type: SensorType.SENSOR_TYPE_3,
      master: 5,
    },
    {
      id: 6,
      name: 'Датчик температуры',
      description: 'Датчик температуры Сидоровых',
      type: SensorType.SENSOR_TYPE_1,
      master: 5,
    },
    {
      id: 7,
      name: 'Датчик давления',
      description: 'Датчик давления Сидоровых',
      type: SensorType.SENSOR_TYPE_1,
      master: 6,
    },
    {
      id: 8,
      name: 'Датчик света 1',
      description: 'Датчик света 1 Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 7,
    },
    {
      id: 8,
      name: 'Датчик света 2',
      description: 'Датчик света 2 Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 7,
    },
    {
      id: 10,
      name: 'Датчик движения',
      description: 'Датчик движения Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 8,
    },
    {
      id: 11,
      name: 'Датчик влажности 1',
      description: 'Датчик влажности 1 семьи Банан',
      type: SensorType.SENSOR_TYPE_3,
      master: 9,
    },
    {
      id: 12,
      name: 'Датчик влажности 2',
      description: 'Датчик влажности 2 семьи Банан',
      type: SensorType.SENSOR_TYPE_1,
      master: 9,
    },
    {
      id: 13,
      name: 'Датчик движения',
      description: 'Датчик движения семьи Банан',
      type: SensorType.SENSOR_TYPE_1,
      master: 10,
    },
    {
      id: 14,
      name: 'Датчик света',
      description: 'Датчик света семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 11,
    },
    {
      id: 15,
      name: 'Датчик давления',
      description: 'Осветительный прибор 2 семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 11,
    },
    {
      id: 16,
      name: 'Датчик газа',
      description: 'Датчик газа семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 12,
    },
    {
      id: 17,
      name: 'Датчик температуры 1',
      description: 'Датчик температуры 1 аптеки',
      type: SensorType.SENSOR_TYPE_3,
      master: 13,
    },
    {
      id: 18,
      name: 'Датчик температуры 2',
      description: 'Датчик температуры 2 аптеки',
      type: SensorType.SENSOR_TYPE_1,
      master: 13,
    },
    {
      id: 19,
      name: 'Датчик влажности',
      description: 'Датчик влажности аптеки',
      type: SensorType.SENSOR_TYPE_1,
      master: 14,
    },
    {
      id: 20,
      name: 'Дачтик света',
      description: 'Датчик света аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 15,
    },
    {
      id: 21,
      name: 'Датчик движения',
      description: 'Датчик движения аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 15,
    },
    {
      id: 22,
      name: 'Датчик давления',
      description: 'Датчик давления аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 16,
    },
    {
      id: 22,
      name: 'Датчик газа 1',
      description: 'Датчик газа 1 кафе',
      type: SensorType.SENSOR_TYPE_3,
      master: 17,
    },
    {
      id: 23,
      name: 'Датчик газа 2',
      description: 'Датчик газа 2 кафе',
      type: SensorType.SENSOR_TYPE_1,
      master: 17,
    },
    {
      id: 24,
      name: 'Датчик температуры',
      description: 'Датчик температуры кафе',
      type: SensorType.SENSOR_TYPE_1,
      master: 18,
    },
    {
      id: 25,
      name: 'Датчик света',
      description: 'Датчик света кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 19,
    },
    {
      id: 26,
      name: 'Датчик движения',
      description: 'Датчик движения кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 20,
    },
    {
      id: 27,
      name: 'Датчик давления',
      description: 'Датчик давления кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 20,
    },
    {
      id: 29,
      name: 'Датчик влажности',
      description: 'Датчик влажности магазина',
      type: SensorType.SENSOR_TYPE_1,
      master: 21,
    },
    {
      id: 30,
      name: 'Датчик температуры',
      description: 'Датчик температуры магазина',
      type: SensorType.SENSOR_TYPE_1,
      master: 22,
    },
    {
      id: 31,
      name: 'Датчик света',
      description: 'Датчик света магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 23,
    },
    {
      id: 32,
      name: 'Датчик давления',
      description: 'Датчик давления магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 24,
    },
    {
      id: 33,
      name: 'Датчик движения',
      description: 'Датчик движения магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 24,
    },
  ];

  private $thingData: Thing[] = [
    {
    id: 1,
    name: 'Прибор учета электроэнергии',
    description: 'Прибор учета электроэнергии',
    type: ThingType.THING_TYPE_1,
    master: 1,
  },
    {
      id: 2,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды',
      type: ThingType.THING_TYPE_2,
      master: 2,
    },
    {
      id: 3,
      name: 'Прибор 3',
      description: 'Прибор 3',
      type: ThingType.THING_TYPE_3,
      master: 3,
    },
    {
      id: 4,
      name: 'Прибор 4',
      description: 'Прибор 4',
      type: ThingType.THING_TYPE_4,
      master: 4,
    },
    {
      id: 5,
      name: 'Чайник',
      description: 'Чайник Сидоровых',
      type: ThingType.THING_TYPE_3,
      master: 5,
    },
    {
      id: 6,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии Сидоровых',
      type: ThingType.THING_TYPE_1,
      master: 5,
    },
    {
      id: 7,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды Сидоровых',
      type: ThingType.THING_TYPE_1,
      master: 6,
    },
    {
      id: 8,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 7,
    },
    {
      id: 8,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 7,
    },
    {
      id: 10,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 8,
    },
    {
      id: 11,
      name: 'Чайник',
      description: 'Чайник семьи Банан',
      type: ThingType.THING_TYPE_3,
      master: 9,
    },
    {
      id: 12,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии семьи Банан',
      type: ThingType.THING_TYPE_1,
      master: 9,
    },
    {
      id: 13,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды семьи Банан',
      type: ThingType.THING_TYPE_1,
      master: 10,
    },
    {
      id: 14,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 11,
    },
    {
      id: 15,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 11,
    },
    {
      id: 16,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 12,
    },
    {
      id: 17,
      name: 'Чайник',
      description: 'Чайник аптеки',
      type: ThingType.THING_TYPE_3,
      master: 13,
    },
    {
      id: 18,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии аптеки',
      type: ThingType.THING_TYPE_1,
      master: 13,
    },
    {
      id: 19,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды аптеки',
      type: ThingType.THING_TYPE_1,
      master: 14,
    },
    {
      id: 20,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 аптеки',
      type: ThingType.THING_TYPE_4,
      master: 15,
    },
    {
      id: 21,
      name: 'Холодильник',
      description: 'Холодильник аптеки',
      type: ThingType.THING_TYPE_4,
      master: 15,
    },
    {
      id: 22,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 аптеки',
      type: ThingType.THING_TYPE_4,
      master: 16,
    },
    {
      id: 22,
      name: 'Холодильник',
      description: 'Холодильник кафе',
      type: ThingType.THING_TYPE_3,
      master: 17,
    },
    {
      id: 23,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии кафе',
      type: ThingType.THING_TYPE_1,
      master: 17,
    },
    {
      id: 24,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды кафе',
      type: ThingType.THING_TYPE_1,
      master: 18,
    },
    {
      id: 25,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 кафе',
      type: ThingType.THING_TYPE_4,
      master: '19',
    },
    {
      id: 26,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 кафе',
      type: ThingType.THING_TYPE_4,
      master: 20,
    },
    {
      id: 27,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 кафе',
      type: ThingType.THING_TYPE_4,
      master: '20',
    },
    {
      id: 29,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии магазина',
      type: ThingType.THING_TYPE_1,
      master: 21,
    },
    {
      id: 30,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды магазина',
      type: ThingType.THING_TYPE_1,
      master: 22,
    },
    {
      id: 31,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 магазина',
      type: ThingType.THING_TYPE_4,
      master: 23,
    },
    {
      id: 32,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 магазина',
      type: ThingType.THING_TYPE_4,
      master: 24,
    },
    {
      id: 33,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 магазина',
      type: ThingType.THING_TYPE_4,
      master: 24,
    }
    ];
    ,
  ];

  private $userData: User[] = [
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

  private $integratorData: User[] = [
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
  ];

  private $adminData: User[] = [
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
  ];

  private $controllerData: Controller[] = [
    {
      id: 1,
      name: 'Контроллер 1',
      description: 'Описание контроллера 1',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 1,
    },
    {
      id: 2,
      name: 'Контроллер 2',
      description: 'Описание контроллера 2',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 1,
    },
    {
      id: 3,
      name: 'Контроллер 3',
      description: 'Описание контроллера 3',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: 1,
    },
    {
      id: 4,
      name: 'Контроллер 4',
      description: 'Описание контроллера 4',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 1,
    },
    {
      id: 5,
      name: 'Контроллер 5',
      description: 'Описание контроллера 5',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 2,
    },
    {
      id: 6,
      name: 'Контроллер 6',
      description: 'Описание контроллера 6',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 2,
    },
    {
      id: 7,
      name: 'Контроллер 7',
      description: 'Описание контроллера 7',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: 2,
    },
    {
      id: 8,
      name: 'Контроллер 8',
      description: 'Описание контроллера 8',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 2,
    },
    {
      id: 9,
      name: 'Контроллер 9',
      description: 'Описание контроллера 9',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 3,
    },
    {
      id: 10,
      name: 'Контроллер 10',
      description: 'Описание контроллера 10',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 3,
    },
    {
      id: 11,
      name: 'Контроллер 11',
      description: 'Описание контроллера 11',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: '3',
    },
    {
      id: 12,
      name: 'Контроллер 12',
      description: 'Описание контроллера 12',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: '3',
    },
    {
      id: 13,
      name: 'Контроллер 13',
      description: 'Описание контроллера 13',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 4,
    },
    {
      id: 14,
      name: 'Контроллер 14',
      description: 'Описание контроллера 14',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 4,
    },
    {
      id: 15,
      name: 'Контроллер 15',
      description: 'Описание контроллера 15',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: 4,
    },
    {
      id: 16,
      name: 'Контроллер 16',
      description: 'Описание контроллера 16',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 4,
    },
    {
      id: 17,
      name: 'Контроллер 17',
      description: 'Описание контроллера 17',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 5,
    },
    {
      id: 18,
      name: 'Контроллер 18',
      description: 'Описание контроллера 18',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 5,
    },
    {
      id: 19,
      name: 'Контроллер 19',
      description: 'Описание контроллера 19',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: 5,
    },
    {
      id: 20,
      name: 'Контроллер 20',
      description: 'Описание контроллера 20',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 5,
    },
    {
      id: 21,
      name: 'Контроллер 21',
      description: 'Описание контроллера 21',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: 6,
    },
    {
      id: 22,
      name: 'Контроллер 22',
      description: 'Описание контроллера 22',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: 6,
    },
    {
      id: 23,
      name: 'Контроллер 23',
      description: 'Описание контроллера 23',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: 6,
    },
    {
      id: 24,
      name: 'Контроллер 24',
      description: 'Описание контроллера 24',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 6,
    },
  ];

  private $userGroupData: UserGroup[] = [
    {
      id: 1,
      name: 'Ул.Мира, дом 15, этаж 3',
      parentId: -1
    },
    {
      id: 2,
      name: 'Ул.Мира, дом 15, этаж 3, квартира 14',
      parentId: 1
    },
    {
      id: 3,
      name: 'Ул.Мира, дом 15, этаж 3, квартира 16',
      parentId: 1
    },
    {
      id: 4,
      name: 'Ул.Мира, дом 15, этаж 1',
      parentId: -1
    },
    {
      id: 5,
      name: 'Ул.Мира, дом 12, этаж 1',
      parentId: -1
    },
    {
      id: 6,
      name: 'Ул.Мира, дом 17А, этаж 1',
      parentId: -1
    },
  ];

  public getIntegrator(login: string): User {
    return this.$integratorData.filter((integ) => integ.login === login).length !== 0 ? this.$integratorData.find((integ) => integ.login === login) : null;
  }

  public getIntegrators(): User[] {
    return this.$integratorData;
  }

  public addIntegrator(login: string, password: string, name: string, info: string): User {
    if (Utils.exists(this.getIntegrator(login)) || Utils.exists(this.getUser(login))  || Utils.exists(this.getAdmin(login))) {
      console.log(`Пользователь ${login} в системе уже зарегистрирован`);
      return null;
    } else {
      const integrator = new User(login, password, name, info, Roles.INTEGRATOR);
      this.$integratorData.push(integrator);
      return integrator;
    }
  }

  public updateIntegrator(oldLogin: string, login: string, password: string, name: string, info: string) {
    if (oldLogin === login) {
      const integrator = this.getIntegrator(login);
      integrator.password = password;
      integrator.name = name;
      integrator.info = info;
    } else {
      const newIntegrator = this.addIntegrator(login, password, name, info);
      if (Utils.exists(newIntegrator)) {
        this.deleteIntegrator(oldLogin);
      }
    }
  }

  public deleteIntegrator(login: string) {
    if (Utils.exists(this.getIntegrator(login))) {
      this.$integratorData.remove((integ) => integ.login === login);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getAdmin(login: string): User {
    return this.$adminData.filter((adm) => adm.login === login).length !== 0 ? this.$adminData.find((adm) => adm.login === login) : null;
  }

  public getAdmins(): User[] {
    return this.$adminData;
  }

  public addAdmin(login: string, password: string, name: string, info: string): User {
    if (Utils.exists(this.getIntegrator(login)) || Utils.exists(this.getUser(login))  || Utils.exists(this.getAdmin(login))) {
      console.log(`Пользователь ${login} в системе уже зарегистрирован`);
      return null;
    } else {
      const admin = new User(login, password, name, info, Roles.ADMIN);
      this.$adminData.push(admin);
      return admin;
    }
  }

  public updateAdmin(oldLogin: string, login: string, password: string, name: string, info: string) {
    if (oldLogin === login) {
      const admin = this.getAdmin(login);
      admin.password = password;
      admin.name = name;
      admin.info = info;
    } else {
      const newAdmin = this.addAdmin(login, password, name, info);
      if (Utils.exists(newAdmin)) {
        this.deleteAdmin(oldLogin);
      }
    }
  }

  public deleteAdmin(login: string) {
    if (Utils.exists(this.getAdmin(login))) {
      this.$adminData.remove((adm) => adm.login === login);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getUser(login: string): User {
    return this.$userData.filter((us) => us.login === login).length !== 0 ? this.$userData.find((us) => us.login === login) : null;
  }

  public getUsers(): User[] {
    return this.$userData;
  }

  public addUser(login: string, password: string, name: string, info: string): User {
    if (Utils.exists(this.getIntegrator(login)) || Utils.exists(this.getUser(login))  || Utils.exists(this.getAdmin(login))) {
      console.log(`Пользователь ${login} в системе уже зарегистрирован`);
      return null;
    } else {
      const user = new User(login, password, name, info, Roles.SIMPLE);
      this.$userData.push(user);
      return user;
    }
  }

  public updateUser(oldLogin: string, login: string, password: string, name: string, info: string) {
    if (oldLogin === login) {
      const user = this.getUser(login);
      user.password = password;
      user.name = name;
      user.info = info;
    } else {
      const newUser = this.addUser(login, password, name, info);
      if (Utils.exists(newUser)) {
        this.deleteUser(oldLogin);
      }
    }
  }

  public deleteUser(login: string) {
    if (Utils.exists(this.getUser(login))) {
      this.$userData.remove((us) => us.login === login);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getScenario(id: number): Scenario {
    return this.$scenarioData.filter((scen) => scen.id === id).length !== 0 ? this.$scenarioData.find((scen) => scen.id === id) : null;
  }

  public getScenarios(): Scenario[] {
    return this.$scenarioData;
  }

  public findMaxIndex(objects: any[]) {
    let max = -1;
    objects.forEach((obj) => {
      if (obj.id > max) {
        max = obj.id;
      }
    });
    return max;
  }

  public addScenario(name: string, description: string, script: string, type: ScenarioType, publicity: boolean, creator: string = ''): Scenario {
    let newId = this.findMaxIndex(this.$scenarioData) + 1;
    while (Utils.exists(this.getScenario(newId))) {
      newId++;
    }
    const scenario = new Scenario(newId, name, description, script, type, publicity, creator);
    this.$scenarioData.push(scenario);
    return scenario;
  }

  public updateScenario(id: number, name: string, description: string, script: string, type: ScenarioType, publicity: boolean) {
    const scenario = this.getScenario(id);
    scenario.description = description;
    scenario.script = script;
    scenario.type = type;
    scenario.publicity = publicity;
  }

  public duplicateScenario(id: number, creator: string) {
    const scenario = this.getScenario(id);
    return this.addScenario(scenario.name, scenario.description, scenario.script, scenario.type, scenario.publicity, creator);
  }

  public deleteScenario(id: number) {
    if (Utils.exists(this.getScenario(id))) {
      this.$scenarioData.remove((scen) => scen.id === id);
    } else {
      console.log(`Такой сценарий в системе не найден`);
    }
  }

  public getSensor(id: number): Sensor {
      return this.$sensorData.filter((sens) => sens.id === id).length !== 0 ? this.$sensorData.find((sens) => sens.id === id) : null;
  }

  public getSensors(): Sensor[] {
    return this.$sensorData;
  }

  public addSensor(name: string, description: string, type: SensorType, master: string): Sensor {
    let newId = this.findMaxIndex(this.$sensorData) + 1;
    while (Utils.exists(this.getScenario(newId))) {
      newId++;
    }
    const sensor = new Sensor(newId, name, description, type, master);
    this.$sensorData.push(sensor),;
    return sensor;
  }

  public deleteSensor(id: number) {
    if (Utils.exists(this.getSensor(id))) {
      this.$sensorData.remove((sens) => sens.id === id);
    } else {
      console.log(`Такой датчик в системе не найден`);
    }
  }

  public getThing(id: number): Thing {
      return this.$thingData.filter((thing) => thing.id === id).length !== 0 ? this.$thingData.find((thing) => thing.id === id) : null;
  }

  public getThings(): Sensor[] {
    return this.$thingData;
  }

  public addThing(name: string, description: string, type: ThingType, master: string): Thing {
    let newId = this.findMaxIndex(this.$thingData) + 1;
    while (Utils.exists(this.getThing(newId))) {
      newId++;
    }
    const thing = new Thing(newId, name, description, type, master);
    this.$thingData.push(thing);
    return thing;
  }

  public deleteThing(id: number) {
    if (Utils.exists(this.getThing(id))) {
      this.$thingData.remove((th) => th.id === id);
    } else {
      console.log(`Такая умная вещь в системе не найдена`);
    }
  }

  public getController(id: number): Controller {
    return this.$controllerData.filter((contr) => contr.id === id).length !== 0 ? this.$controllerData.find((contr) => contr.id === id) : null;
  }

  public getControllers(): Controller[] {
    return this.$controllerData;
  }

  public addController(name: string, description: string, type: ControllerType, master: string): Controller {
    let newId = this.findMaxIndex(this.$controllerData) + 1;
    while (Utils.exists(this.getController(newId))) {
      newId++;
    }
    const controller = new Controller(newId, name, description, type, master);
    this.$controllerData.push(controller);
    return controller;
  }

  public deleteController(id: number) {
    if (Utils.exists(this.getSensor(id))) {
      this.$controllerData.remove((contr) => contr.id === id);
    } else {
      console.log(`Такой контроллер в системе не найден`);
    }
  }

  public getUserGroup(id: number) {
    return this.$userGroupData.filter((uGr) => uGr.id === id).length !== 0 ? this.$userGroupData.find((uGr) => uGr.id === id) : null;
  }

  public getUserGroups() {
    return this.$userGroupData;
  }

  public addUserGroup(name: string, parent: number) {
    let newId = this.findMaxIndex(this.$userGroupData) + 1;
    while (Utils.exists(this.getUserGroup(newId))) {
      newId++;
    }
    const user_group = new UserGroup(newId, name, parent);
    this.$userGroupData.push(user_group);
    return user_group;
  }

  public updateUserGroup(id: number, name: string, parent: number) {
    const user_group = this.getUserGroup(id);
    user_group.name = name;
    user_group.parentId = parent;
  }

  public deleteUserGroup(id: number) {
    if (Utils.exists(this.getUserGroup(id))) {
      this.$userGroupData.remove((uGr) => uGr.id === id);
    } else {
      console.log(`Такая группа пользователей в системе не найдена`);
    }
  }

  public getChildrenUserGroup(id: number) {
    return this.$userGroupData.filter((uGr) => uGr.parentId === id);
  }

  public getAllChildrenUserGroup(id: number) {
    const children = this.getChildrenUserGroup(id);
    if (children.length === 0) {
      return [];
    }
    children.forEach((ch) => {
      const newChildren = this.getChildrenUserGroup(ch.id);
      if (newChildren.length !== 0) {
        children.pushAll(newChildren);
      }
    });
    return children;
  }

  public getUsersByGroup(id: number) {
    return this.$userData.filter((us) => us.group === id);
  }

  public getUsersByChildrenGroup(id: number) {
    const users = this.getUsersByGroup(id);
    const groups = this.getAllChildrenUserGroup(id);
    groups.forEach((gr) => {
      users.pushAll(this.getUsersByGroup(gr.id));
    }),
    return users;
  }

  public getIntegratorsByGroup(id: number) {
    return this.$integratorData.filter((integr) => integr.group === id);
  }

  public getIntegratorsByChildrenGroup(id: number) {
    const integrators = this.getIntegratorsByGroup(id);
    const groups = this.getAllChildrenUserGroup(id);
    groups.forEach((gr) => {
      integrators.pushAll(this.getUsersByGroup(gr.id));
    }),
    return integrators;
  }
}
