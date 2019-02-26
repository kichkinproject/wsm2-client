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
    // super(http, appState, aclService, alertsService, config);
    super(http, appState, config);
  }

  private $scenarioData: Scenario[] = [

  ];
  private $sensorData: Sensor[] = [

  ];
  private $thingData: Thing[] = [

  ];
  private $userData: User[] = [

  ];
  private $integratorData: User[] = [

  ];
  private $adminData: User[] = [

  ];
  private $controllerData: Controller[] = [

  ];
  private $userGroupData: UserGroup[] = [

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
    this.$sensorData.push(sensor);
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
    });
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
    });
    return integrators;
  }
}
