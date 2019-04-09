import {User} from './user';
import {Roles} from './role';
import {Scenario} from './scenario';
import {ControllerType, ScenarioType, SensorType, ThingType} from './entity-type';
import {Sensor} from './sensor';
import {Thing} from './thing';
import {Controller} from './controller';
import {UserGroup} from './user-group';
import { ScenarioController } from "./scenario-controller";

export class WsmData {
  private userData: User[] = [
    {
      login: 'system_author',
      password: '123qwewq32',
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

  private scenarioData: Array<Scenario> = [
    {
      id: 1,
      name: 'Сценарий - Электроэнергия ночь',
      description: 'С 23:30 до 06:00 свет не включается при движении, можно включить только руками.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: true,
      creator: 0
    },
    {
      id: 2,
      name: 'Сценарий - Электроэнергия день',
      description: 'С 9:00 до 18:00 в будние дни свет не включается при движении, можно включить только руками.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: true,
      creator: 0
    },
    {
      id: 3,
      name: 'Сценарий - Тепло',
      description: 'Сценарий включения тепла при достижении 18 градусов в помещении',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SENSOR_ACTION,
      publicity: true,
      creator: 0
    },
    {
      id: 4,
      name: 'Сценарий - управление водонагревателем',
      description: 'Сценарий управления водонагревателем по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: true,
      creator: 0
    },
    {
      id: 5,
      name: 'Сценарий - управление сигнализацией',
      description: 'Сценарий управления сигнализацией по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: true,
      creator: 0
    },
    {
      id: 6,
      name: 'Сценарий Сидоровы Интернет',
      description: 'Сценарий включает родительский контроль для интернета и каналов по телевизору',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 7,
      name: 'Сценарий Сидоровы Теплый пол',
      description: 'Сценарий включает теплый пол в будние дни в 14:00 (за полчаса до прихода ребенка из школы)',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 8,
      name: 'Сценарий Банан Вода',
      description: 'Сценарий перекрытия воды',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION ,
      publicity: false,
      creator: 0
    },
    {
      id: 9,
      name: 'Сценарий Банан Чайник',
      description: 'Сценарий управления чайником по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 10,
      name: 'Сценарий свет на лестничной клетке',
      description: 'Сценарий управления светом на лестничной клетке по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 11,
      name: 'Сценарий - Аптека электроэнергия',
      description: 'Сценарий отключения электроприборов кроме холодильников в аптеке в период с 23:00 до 08:00',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: false,
      creator: 0
    },
    {
      id: 12,
      name: 'Сценарий - Вывеска',
      description: 'Сценарий управления вывеской - с 9:00 до 18:00 в будние дни свет вывеска не горит.',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION ,
      publicity: false,
      creator: 0
    },
    {
      id: 13,
      name: 'Сценарий - Вода Кафе',
      description: 'Сценарий управления горячей водой - повторный нагрев воды в водонагревателе, если она остынет до 10 градусов',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SENSOR_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 14,
      name: 'Сценарий - управление водонагревателем',
      description: 'Сценарий управления водонагревателем по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 15,
      name: 'Сценарий - управление вентиляцией',
      description: 'Сценарий управления вентиляцией по желанию пользователя',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.USER_ACTION,
      publicity: false,
      creator: 0
    },
    {
      id: 16,
      name: 'Сценарий - управление сигнализацией',
      description: 'Сценарий включает сигнализацию в 19:00 и отключает в 10:00 в будние дни',
      script: 'Скрипт на утвержденном с заказчиком языке',
      type: ScenarioType.SCHEDULE_ACTION,
      publicity: false,
      creator: 0
    },
  ];

  private sensorData: Array<Sensor> = [
    {
      id: 1,
      name: 'Датчик влажности',
      description: 'Датчик влажности',
      type: SensorType.SENSOR_TYPE_1,
      master: 1,
      controller: -1,
    },
    {
      id: 2,
      name: 'Датчик движения',
      description: 'Датчик движения',
      type: SensorType.SENSOR_TYPE_2,
      master: 2,
      controller: -1,
    },
    {
      id: 3,
      name: 'Датчик температуры',
      description: 'Датчик температуры',
      type: SensorType.SENSOR_TYPE_3,
      master: 3,
      controller: -1,
    },
    {
      id: 4,
      name: 'Датчик света',
      description: 'Датчик света',
      type: SensorType.SENSOR_TYPE_4,
      master: 4,
      controller: -1,
    },
    {
      id: 5,
      name: 'Датчик влажности',
      description: 'Датчик влажности Сидоровых',
      type: SensorType.SENSOR_TYPE_3,
      master: 5,
      controller: -1,
    },
    {
      id: 6,
      name: 'Датчик температуры',
      description: 'Датчик температуры Сидоровых',
      type: SensorType.SENSOR_TYPE_1,
      master: 5,
      controller: -1,
    },
    {
      id: 7,
      name: 'Датчик давления',
      description: 'Датчик давления Сидоровых',
      type: SensorType.SENSOR_TYPE_1,
      master: 6,
      controller: -1,
    },
    {
      id: 8,
      name: 'Датчик света 1',
      description: 'Датчик света 1 Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 7,
      controller: -1,
    },
    {
      id: 8,
      name: 'Датчик света 2',
      description: 'Датчик света 2 Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 7,
      controller: -1,
    },
    {
      id: 10,
      name: 'Датчик движения',
      description: 'Датчик движения Сидоровых',
      type: SensorType.SENSOR_TYPE_4,
      master: 8,
      controller: -1,
    },
    {
      id: 11,
      name: 'Датчик влажности 1',
      description: 'Датчик влажности 1 семьи Банан',
      type: SensorType.SENSOR_TYPE_3,
      master: 9,
      controller: -1,
    },
    {
      id: 12,
      name: 'Датчик влажности 2',
      description: 'Датчик влажности 2 семьи Банан',
      type: SensorType.SENSOR_TYPE_1,
      master: 9,
      controller: -1,
    },
    {
      id: 13,
      name: 'Датчик движения',
      description: 'Датчик движения семьи Банан',
      type: SensorType.SENSOR_TYPE_1,
      master: 10,
      controller: -1,
    },
    {
      id: 14,
      name: 'Датчик света',
      description: 'Датчик света семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 11,
      controller: -1,
    },
    {
      id: 15,
      name: 'Датчик давления',
      description: 'Осветительный прибор 2 семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 11,
      controller: -1,
    },
    {
      id: 16,
      name: 'Датчик газа',
      description: 'Датчик газа семьи Банан',
      type: SensorType.SENSOR_TYPE_4,
      master: 12,
      controller: -1,
    },
    {
      id: 17,
      name: 'Датчик температуры 1',
      description: 'Датчик температуры 1 аптеки',
      type: SensorType.SENSOR_TYPE_3,
      master: 13,
      controller: -1,
    },
    {
      id: 18,
      name: 'Датчик температуры 2',
      description: 'Датчик температуры 2 аптеки',
      type: SensorType.SENSOR_TYPE_1,
      master: 13,
      controller: -1,
    },
    {
      id: 19,
      name: 'Датчик влажности',
      description: 'Датчик влажности аптеки',
      type: SensorType.SENSOR_TYPE_1,
      master: 14,
      controller: -1,
    },
    {
      id: 20,
      name: 'Дачтик света',
      description: 'Датчик света аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 15,
      controller: -1,
    },
    {
      id: 21,
      name: 'Датчик движения',
      description: 'Датчик движения аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 15,
      controller: -1,
    },
    {
      id: 22,
      name: 'Датчик давления',
      description: 'Датчик давления аптеки',
      type: SensorType.SENSOR_TYPE_4,
      master: 16,
      controller: -1,
    },
    {
      id: 22,
      name: 'Датчик газа 1',
      description: 'Датчик газа 1 кафе',
      type: SensorType.SENSOR_TYPE_3,
      master: 17,
      controller: -1,
    },
    {
      id: 23,
      name: 'Датчик газа 2',
      description: 'Датчик газа 2 кафе',
      type: SensorType.SENSOR_TYPE_1,
      master: 17,
      controller: -1,
    },
    {
      id: 24,
      name: 'Датчик температуры',
      description: 'Датчик температуры кафе',
      type: SensorType.SENSOR_TYPE_1,
      master: 18,
      controller: -1,
    },
    {
      id: 25,
      name: 'Датчик света',
      description: 'Датчик света кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 19,
      controller: -1,
    },
    {
      id: 26,
      name: 'Датчик движения',
      description: 'Датчик движения кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 20,
      controller: -1,
    },
    {
      id: 27,
      name: 'Датчик давления',
      description: 'Датчик давления кафе',
      type: SensorType.SENSOR_TYPE_4,
      master: 20,
      controller: -1,
    },
    {
      id: 29,
      name: 'Датчик влажности',
      description: 'Датчик влажности магазина',
      type: SensorType.SENSOR_TYPE_1,
      master: 21,
      controller: -1,
    },
    {
      id: 30,
      name: 'Датчик температуры',
      description: 'Датчик температуры магазина',
      type: SensorType.SENSOR_TYPE_1,
      master: 22,
      controller: -1,
    },
    {
      id: 31,
      name: 'Датчик света',
      description: 'Датчик света магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 23,
      controller: -1,
    },
    {
      id: 32,
      name: 'Датчик давления',
      description: 'Датчик давления магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 24,
      controller: -1,
    },
    {
      id: 33,
      name: 'Датчик движения',
      description: 'Датчик движения магазина',
      type: SensorType.SENSOR_TYPE_4,
      master: 24,
      controller: -1,
    },
  ];

  private thingData: Array<Thing> = [
    {
      id: 1,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии',
      type: ThingType.THING_TYPE_1,
      master: 1,
      controller: -1,
    },
    {
      id: 2,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды',
      type: ThingType.THING_TYPE_2,
      master: 2,
      controller: -1,
    },
    {
      id: 3,
      name: 'Прибор 3',
      description: 'Прибор 3',
      type: ThingType.THING_TYPE_3,
      master: 3,
      controller: -1,
    },
    {
      id: 4,
      name: 'Прибор 4',
      description: 'Прибор 4',
      type: ThingType.THING_TYPE_4,
      master: 4,
      controller: -1,
    },
    {
      id: 5,
      name: 'Чайник',
      description: 'Чайник Сидоровых',
      type: ThingType.THING_TYPE_3,
      master: 5,
      controller: -1,
    },
    {
      id: 6,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии Сидоровых',
      type: ThingType.THING_TYPE_1,
      master: 5,
      controller: -1,
    },
    {
      id: 7,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды Сидоровых',
      type: ThingType.THING_TYPE_1,
      master: 6,
      controller: -1,
    },
    {
      id: 8,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 7,
      controller: -1,
    },
    {
      id: 8,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 7,
      controller: -1,
    },
    {
      id: 10,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 Сидоровых',
      type: ThingType.THING_TYPE_4,
      master: 8,
      controller: -1,
    },
    {
      id: 11,
      name: 'Чайник',
      description: 'Чайник семьи Банан',
      type: ThingType.THING_TYPE_3,
      master: 9,
      controller: -1,
    },
    {
      id: 12,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии семьи Банан',
      type: ThingType.THING_TYPE_1,
      master: 9,
      controller: -1,
    },
    {
      id: 13,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды семьи Банан',
      type: ThingType.THING_TYPE_1,
      master: 10,
      controller: -1,
    },
    {
      id: 14,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 11,
      controller: -1,
    },
    {
      id: 15,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 11,
      controller: -1,
    },
    {
      id: 16,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 семьи Банан',
      type: ThingType.THING_TYPE_4,
      master: 12,
      controller: -1,
    },
    {
      id: 17,
      name: 'Чайник',
      description: 'Чайник аптеки',
      type: ThingType.THING_TYPE_3,
      master: 13,
      controller: -1,
    },
    {
      id: 18,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии аптеки',
      type: ThingType.THING_TYPE_1,
      master: 13,
      controller: -1,
    },
    {
      id: 19,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды аптеки',
      type: ThingType.THING_TYPE_1,
      master: 14,
      controller: -1,
    },
    {
      id: 20,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 аптеки',
      type: ThingType.THING_TYPE_4,
      master: 15,
      controller: -1,
    },
    {
      id: 21,
      name: 'Холодильник',
      description: 'Холодильник аптеки',
      type: ThingType.THING_TYPE_4,
      master: 15,
      controller: -1,
    },
    {
      id: 22,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 аптеки',
      type: ThingType.THING_TYPE_4,
      master: 16,
      controller: -1,
    },
    {
      id: 22,
      name: 'Холодильник',
      description: 'Холодильник кафе',
      type: ThingType.THING_TYPE_3,
      master: 17,
      controller: -1,
    },
    {
      id: 23,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии кафе',
      type: ThingType.THING_TYPE_1,
      master: 17,
      controller: -1,
    },
    {
      id: 24,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды кафе',
      type: ThingType.THING_TYPE_1,
      master: 18,
      controller: -1,
    },
    {
      id: 25,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 кафе',
      type: ThingType.THING_TYPE_4,
      master: 19,
      controller: -1,
    },
    {
      id: 26,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 кафе',
      type: ThingType.THING_TYPE_4,
      master: 20,
      controller: -1,
    },
    {
      id: 27,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 кафе',
      type: ThingType.THING_TYPE_4,
      master: 20,
      controller: -1,
    },
    {
      id: 29,
      name: 'Прибор учета электроэнергии',
      description: 'Прибор учета электроэнергии магазина',
      type: ThingType.THING_TYPE_1,
      master: 21,
      controller: -1,
    },
    {
      id: 30,
      name: 'Прибор учета воды',
      description: 'Прибор учета воды магазина',
      type: ThingType.THING_TYPE_1,
      master: 22,
      controller: -1,
    },
    {
      id: 31,
      name: 'Осветительный прибор 1',
      description: 'Осветительный прибор 1 магазина',
      type: ThingType.THING_TYPE_4,
      master: 23,
      controller: -1,
    },
    {
      id: 32,
      name: 'Осветительный прибор 2',
      description: 'Осветительный прибор 2 магазина',
      type: ThingType.THING_TYPE_4,
      master: 24,
      controller: -1,
    },
    {
      id: 33,
      name: 'Осветительный прибор 3',
      description: 'Осветительный прибор 3 магазина',
      type: ThingType.THING_TYPE_4,
      master: 24,
      controller: -1,
    }
  ];

  private controllerData: Array<Controller> = [
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
      master: 3,
    },
    {
      id: 12,
      name: 'Контроллер 12',
      description: 'Описание контроллера 12',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: 3,
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

  private userGroupData: Array<UserGroup> = [
    {
      id: 1,
      name: 'Ул.Мира, дом 15, этаж 3',
      description: '',
      parentId: -1
    },
    {
      id: 2,
      name: 'Ул.Мира, дом 15, этаж 3, квартира 14',
      description: '',
      parentId: 1
    },
    {
      id: 3,
      name: 'Ул.Мира, дом 15, этаж 3, квартира 16',
      description: '',
      parentId: 1
    },
    {
      id: 4,
      name: 'Ул.Мира, дом 15, этаж 1',
      description: '',
      parentId: -1
    },
    {
      id: 5,
      name: 'Ул.Мира, дом 12, этаж 1',
      description: '',
      parentId: -1
    },
    {
      id: 6,
      name: 'Ул.Мира, дом 17А, этаж 1',
      description: '',
      parentId: -1
    },
  ];

  private scenarioСontrollerData: Array<ScenarioController> = [
    {
      id: 1,
      scenarioId: 1,
      controllerId: 1,
      activated: true
    },
    {
      id: 2,
      scenarioId: 1,
      controllerId: 5,
      activated: true
    },
    {
      id: 3,
      scenarioId: 1,
      controllerId: 7,
      activated: true
    },
    {
      id: 4,
      scenarioId: 1,
      controllerId: 13,
      activated: true
    },
    {
      id: 5,
      scenarioId: 2,
      controllerId: 5,
      activated: true
    },
    {
      id: 6,
      scenarioId: 2,
      controllerId: 4,
      activated: true
    },
    {
      id: 7,
      scenarioId: 2,
      controllerId: 9,
      activated: true
    },
    {
      id: 8,
      scenarioId: 2,
      controllerId: 22,
      activated: true
    },
    // продолжить отсюда
    {
      id: 9,
      scenarioId: 3,
      controllerId: 24,
      activated: true
    },
    {
      id: 10,
      scenarioId: 3,
      controllerId: 3,
      activated: true
    },
    {
      id: 11,
      scenarioId: 3,
      controllerId: 4,
      activated: true
    },
    {
      id: 12,
      scenarioId: 3,
      controllerId: 8,
      activated: true
    },
    {
      id: 13,
      scenarioId: 4,
      controllerId: 9,
      activated: true
    },
    {
      id: 14,
      scenarioId: 4,
      controllerId: 19,
      activated: true
    },
    {
      id: 15,
      scenarioId: 4,
      controllerId: 11,
      activated: true
    },
    {
      id: 16,
      scenarioId: 4,
      controllerId: 13,
      activated: true
    },
    {
      id: 17,
      scenarioId: 5,
      controllerId: 6,
      activated: true
    },
    {
      id: 18,
      scenarioId: 5,
      controllerId: 2,
      activated: true
    },
    {
      id: 19,
      scenarioId: 5,
      controllerId: 1,
      activated: true
    },
    {
      id: 20,
      scenarioId: 5,
      controllerId: 17,
      activated: true
    },
    {
      id: 21,
      scenarioId: 6,
      controllerId: 17,
      activated: true
    },
    {
      id: 22,
      scenarioId: 6,
      controllerId: 13,
      activated: true
    },
    {
      id: 23,
      scenarioId: 6,
      controllerId: 18,
      activated: true
    },
    {
      id: 24,
      scenarioId: 6,
      controllerId: 25,
      activated: true
    },
    {
      id: 25,
      scenarioId: 7,
      controllerId: 7,
      activated: true
    },
    {
      id: 26,
      scenarioId: 7,
      controllerId: 6,
      activated: true
    },
    {
      id: 27,
      scenarioId: 7,
      controllerId: 5,
      activated: true
    },
    {
      id: 28,
      scenarioId: 7,
      controllerId: 4,
      activated: true
    },
    {
      id: 29,
      scenarioId: 8,
      controllerId: 13,
      activated: true
    },
    {
      id: 30,
      scenarioId: 8,
      controllerId: 25,
      activated: true
    },
    {
      id: 31,
      scenarioId: 8,
      controllerId: 17,
      activated: true
    },
    {
      id: 32,
      scenarioId: 8,
      controllerId: 13,
      activated: true
    },
    {
      id: 33,
      scenarioId: 9,
      controllerId: 1,
      activated: true
    },
    {
      id: 34,
      scenarioId: 9,
      controllerId: 5,
      activated: true
    },
    {
      id: 35,
      scenarioId: 9,
      controllerId: 7,
      activated: true
    },
    {
      id: 36,
      scenarioId: 9,
      controllerId: 13,
      activated: true
    },
    {
      id: 37,
      scenarioId: 10,
      controllerId: 17,
      activated: true
    },
    {
      id: 38,
      scenarioId: 10,
      controllerId: 13,
      activated: true
    },
    {
      id: 39,
      scenarioId: 10,
      controllerId: 12,
      activated: true
    },
    {
      id: 40,
      scenarioId: 10,
      controllerId: 5,
      activated: true
    },
    {
      id: 41,
      scenarioId: 11,
      controllerId: 7,
      activated: true
    },
    {
      id: 42,
      scenarioId: 11,
      controllerId: 1,
      activated: true
    },
    {
      id: 43,
      scenarioId: 11,
      controllerId: 11,
      activated: true
    },
    {
      id: 44,
      scenarioId: 11,
      controllerId: 16,
      activated: true
    },
    {
      id: 45,
      scenarioId: 12,
      controllerId: 18,
      activated: true
    },
    {
      id: 46,
      scenarioId: 12,
      controllerId: 19,
      activated: true
    },
    {
      id: 47,
      scenarioId: 12,
      controllerId: 20,
      activated: true
    },
    {
      id: 48,
      scenarioId: 12,
      controllerId: 10,
      activated: true
    },
    {
      id: 49,
      scenarioId: 13,
      controllerId: 21,
      activated: true
    },
    {
      id: 50,
      scenarioId: 13,
      controllerId: 24,
      activated: true
    },
    {
      id: 51,
      scenarioId: 13,
      controllerId: 17,
      activated: true
    },
    {
      id: 52,
      scenarioId: 13,
      controllerId: 13,
      activated: true
    },
    {
      id: 53,
      scenarioId: 14,
      controllerId: 13,
      activated: true
    },
    {
      id: 54,
      scenarioId: 14,
      controllerId: 15,
      activated: true
    },
    {
      id: 55,
      scenarioId: 14,
      controllerId: 17,
      activated: true
    },
    {
      id: 56,
      scenarioId: 14,
      controllerId: 11,
      activated: true
    },
    {
      id: 57,
      scenarioId: 15,
      controllerId: 8,
      activated: true
    },
    {
      id: 58,
      scenarioId: 15,
      controllerId: 9,
      activated: true
    },
    {
      id: 59,
      scenarioId: 15,
      controllerId: 6,
      activated: true
    },
    {
      id: 60,
      scenarioId: 15,
      controllerId: 7,
      activated: true
    },
    {
      id: 61,
      scenarioId: 16,
      controllerId: 5,
      activated: true
    },
    {
      id: 62,
      scenarioId: 16,
      controllerId: 4,
      activated: true
    },
    {
      id: 63,
      scenarioId: 16,
      controllerId: 3,
      activated: true
    },
    {
      id: 64,
      scenarioId: 16,
      controllerId: 2,
      activated: true
    },
  ];

  public allUsers(): Array<User> {
    return this.userData;
  }

  public integrators(): Array<User> {
    return this.userData.filter((data) => data.role === Roles.INTEGRATOR);
  }

  public admins(): Array<User> {
    return this.userData.filter((data) => data.role === Roles.ADMIN);
  }

  public users(): Array<User> {
    return this.userData.filter((data) => data.role === Roles.SIMPLE);
  }

  public scenarios(): Array<Scenario> {
    return this.scenarioData;
  }

  public scenarioControllers(): Array<ScenarioController> {
    return this.scenarioСontrollerData;
  }

  public userGroups(): Array<UserGroup> {
    return this.userGroupData;
  }

  public controllers(): Array<Controller> {
    return this.controllerData;
  }

  public things(): Array<Thing> {
    return this.thingData;
  }

  public sensors(): Array<Sensor> {
    return this.sensorData;
  }
}
