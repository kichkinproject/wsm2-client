import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { IAppConfig } from '../app.config';
import { AppConfigToken, AppStateToken } from "../models/token";
import { Observable } from 'rxjs';
import { AppState, IAppState } from "../models/app-state";
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
import {WsmData} from '../models/data';
import { ScenarioController } from "../models/scenario-controller";
import {
  urlAdmin,
  urlAccount,
  urlController,
  urlScenario,
  urlSensor,
  urlThing,
  urlUser,
  urlUserGroup,
  urlValue, baseApi
} from "../models/api-urls";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class Wsm2DataService extends ApiService {
  constructor(protected http: HttpClient,
              @Inject(AppStateToken) protected appState: IAppState,
              @Inject(AppConfigToken) protected config: IAppConfig
  ) {
    // super(http, appState, aclService, alertsService, config),
    super(http, appState, config);
  }

  private adminUrl = `${this.config.WebApiUrl}/admin`;
  private controllerUrl = `${this.config.WebApiUrl}/controller`;
  private forControllersUrl = `${this.config.WebApiUrl}/forControllers`;
  private scenarioUrl = `${this.config.WebApiUrl}/scenario`;
  private sensorUrl = `${this.config.WebApiUrl}/sensor`;
  private thingUrl = `${this.config.WebApiUrl}/smartThing`;
  private userUrl = `${this.config.WebApiUrl}/user`;
  private userGroupUrl = `${this.config.WebApiUrl}/userGroup`;
  private valueUrl = `${this.config.WebApiUrl}/values`;


  private source: WsmData = new WsmData();

  private $scenarioData: Array<Scenario> = this.source.scenarios();

  private $sensorData: Array<Sensor> = this.source.sensors();

  private $thingData: Array<Thing> = this.source.things();

  private $userData: Array<User> = this.source.users();

  private $integratorData: Array<User> = this.source.integrators();

  private $adminData: Array<User> = this.source.admins();

  private $controllerData: Array<Controller> = this.source.controllers();

  private $userGroupData: Array<UserGroup> = this.source.userGroups();

  private $scenarioControllerData: Array<ScenarioController> = this.source.scenarioControllers();

  public getIntegrator(login: string): User {
    return this.$integratorData.filter((integ) => integ.login === login).length !== 0
      ? this.$integratorData.find((integ) => integ.login === login)
      : null;
  }

  public getIntegrators(): Array<User> {
    return this.$integratorData;
  }

  // public getIntegrators2(): Array<User> {
  //   const users = this.http.get(`${baseApi}/${urlUser}/AllUsers`, httpOptions);
  //
  // }

  public addIntegrator(login: string, password: string, name: string, info: string, group: number): User {
    if (Utils.exists(this.getIntegrator(login)) || Utils.exists(this.getUser(login))  || Utils.exists(this.getAdmin(login))) {
      console.log(`Пользователь ${login} в системе уже зарегистрирован`);
      return null;
    } else {
      if (Utils.exists(this.getUserGroup(group))) {
        const integrator = new User(login, password, name, info, Roles.INTEGRATOR, group);
        this.$integratorData.push(integrator);
        return integrator;
      } else {
        console.log('Такой группы пользователей нет');
      }
    }
  }

  public updateIntegrator(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {
    if (Utils.exists(this.getUserGroup(group))) {
      if (oldLogin === login) {
        const integrator = this.getIntegrator(login);
        integrator.password = password;
        integrator.name = name;
        integrator.info = info;
        integrator.group = group;
      } else {
        const newIntegrator = this.addIntegrator(login, password, name, info, group);
        if (Utils.exists(newIntegrator)) {
          this.deleteIntegrator(oldLogin);
        }
      }
    } else {
      console.log('Определенной группы пользователей нет');
    }
  }

  public deleteIntegrator(login: string) {
    const integrator = this.getIntegrator(login);
    if (Utils.exists(integrator)) {
      const index = this.$integratorData.indexOf(integrator);
      this.$integratorData.splice(index, 1);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getAdmin(login: string): User {
    return this.$adminData.filter((adm) => adm.login === login).length !== 0 ? this.$adminData.find((adm) => adm.login === login) : null;
  }

  public getAdmins(): Array<User> {
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
    const admin = this.getAdmin(login);
    if (Utils.exists(admin)) {
      const index = this.$adminData.indexOf(admin);
      this.$adminData.splice(index, 1);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getSomeUser(login: string) {
    if (this.getAdmin(login)) {
      return this.getAdmin(login);
    }
    if (this.getIntegrator(login)) {
      return this.getIntegrator(login);
    }
    if (this.getUser(login)) {
      return this.getUser(login);
    }
  }

  public getUser(login: string): User {
    return this.$userData.filter((us) => us.login === login).length !== 0 ? this.$userData.find((us) => us.login === login) : null;
  }

  public getUsers(): Array<User> {
    return this.$userData;
  }

  public addUser(login: string, password: string, name: string, info: string, group: number): User {
    if (Utils.exists(this.getIntegrator(login)) || Utils.exists(this.getUser(login))  || Utils.exists(this.getAdmin(login))) {
      console.log(`Пользователь ${login} в системе уже зарегистрирован`);
      return null;
    } else {
      if (Utils.exists(this.getUserGroup(group))) {
        const user = new User(login, password, name, info, Roles.SIMPLE, group);
        this.$userData.push(user);
        return user;
      } else {
        console.log('Такой группы пользователей нет');
      }
    }
  }

  public updateUser(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {
    if (Utils.exists(this.getUserGroup(group))) {
      if (oldLogin === login) {
      const user = this.getUser(login);
      user.password = password;
      user.name = name;
      user.info = info;
      user.group = group;
    } else {
      const newUser = this.addUser(login, password, name, info, group);
        if (Utils.exists(newUser)) {
          this.deleteUser(oldLogin);
        }
      }
    } else {
      console.log('Определенной группы пользователей нет');
    }
  }

  public deleteUser(login: string) {
    const user = this.getUser(login);
    if (Utils.exists(user)) {
      const index = this.$userData.indexOf(user);
      this.$userData.splice(index, 1);
    } else {
      console.log(`Пользователя ${login} в системе не существует`);
    }
  }

  public getScenario(id: number): Scenario {
    return this.$scenarioData.filter((scen) => scen.id === id).length !== 0 ? this.$scenarioData.find((scen) => scen.id === id) : null;
  }

  public getScenarios(): Array<Scenario> {
    return this.$scenarioData;
  }

  public getPublicScenarios(): Array<Scenario> {
    return this.$scenarioData.filter(sc => sc.publicity);
  }

  public getPrivateScenarios(): Array<Scenario> {
    return this.$scenarioData.filter(sc => !sc.publicity);
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

  public duplicateScenario(id: number, creator: string = '', publicity: boolean = false) {
    const scenario = this.getScenario(id);
    return this.addScenario(scenario.name, scenario.description, scenario.script, scenario.type, publicity, creator);
  }

  public getScenarioByCreator(login: string) {
    return this.$scenarioData.filter((scen) => scen.creator === login);
  }

  public deleteScenario(id: number) {
    const scenario = this.getScenario(id);
    if (Utils.exists(scenario)) {
      const index = this.$scenarioData.indexOf(scenario);
      this.$scenarioData.splice(index, 1);
    } else {
      console.log(`Такой сценарий в системе не найден`);
    }
  }

  public getSensor(id: number): Sensor {
      return this.$sensorData.filter((sens) => sens.id === id).length !== 0
        ? this.$sensorData.find((sens) => sens.id === id)
        : null;
  }

  public getSensors(): Array<Sensor> {
    return this.$sensorData;
  }

  public getSensorsByGroup(id: number): Array<Sensor> {
    return this.$sensorData.filter((sens) => sens.master === id);
  }

  public getSensorsByController(id: number): Array<Sensor> {
    return this.$sensorData.filter((sens) => sens.controller === id);
  }

  public addSensor(name: string, description: string, type: SensorType, master: number, controller: number = -1): Sensor {
    let newId = this.findMaxIndex(this.$sensorData) + 1;
    while (Utils.exists(this.getScenario(newId))) {
      newId++;
    }
    const sensor = new Sensor(newId, name, description, type, master, controller);
    this.$sensorData.push(sensor);
    return sensor;
  }

  public createSensorControllerLink(id: number, controller: number) {
    const sensor = this.getSensor(id);
    sensor.controller = controller;
  }

  public destroySensorControllerLink(id: number) {
    const sensor = this.getSensor(id);
    sensor.controller = -1;
  }

  public deleteSensor(id: number) {
    const sensor = this.getSensor(id);
    if (Utils.exists(sensor)) {
      const index = this.$sensorData.indexOf(sensor);
      this.$sensorData.splice(index, 1);
    } else {
      console.log(`Такой датчик в системе не найден`);
    }
  }

  public getThing(id: number): Thing {
      return this.$thingData.filter((thing) => thing.id === id).length !== 0
        ? this.$thingData.find((thing) => thing.id === id)
        : null;
  }

  public getThings(): Array<Thing> {
    return this.$thingData;
  }

  public getThingsByGroup(id: number): Array<Thing> {
    return this.$thingData.filter((th) => th.master === id);
  }

  public getThingsByController(id: number): Array<Thing> {
    return this.$thingData.filter((th) => th.controller === id);
  }

  public addThing(name: string, description: string, type: ThingType, master: number, controller: number = -1): Thing {
    let newId = this.findMaxIndex(this.$thingData) + 1;
    while (Utils.exists(this.getThing(newId))) {
      newId++;
    }
    const thing = new Thing(newId, name, description, type, master, controller);
    this.$thingData.push(thing);
    return thing;
  }

  public createThingControllerLink(id: number, controller: number) {
    const thing = this.getThing(id);
    thing.controller = controller;
  }

  public destroyThingControllerLink(id: number) {
    const thing = this.getThing(id);
    thing.controller = -1;
  }

  public deleteThing(id: number) {
    const thing = this.getThing(id);
    if (Utils.exists(thing)) {
      const index = this.$thingData.indexOf(thing);
      this.$thingData.splice(index, 1);
    } else {
      console.log(`Такое устройство в системе не найдено`);
    }
  }

  public getController(id: number): Controller {
    return this.$controllerData.filter((contr) => contr.id === id).length !== 0
      ? this.$controllerData.find((contr) => contr.id === id)
      : null;
  }

  public getControllers(): Array<Controller> {
    return this.$controllerData;
  }


  public getControllersByGroup(id: number) {
    return this.$controllerData.filter((cnt) => cnt.master === id);
  }

  public addController(name: string, description: string, type: ControllerType, master: number): Controller {
    let newId = this.findMaxIndex(this.$controllerData) + 1;
    while (Utils.exists(this.getController(newId))) {
      newId++;
    }
    const controller = new Controller(newId, name, description, type, master);
    this.$controllerData.push(controller);
    return controller;
  }

  public deleteController(id: number) {
    const controller = this.getController(id);
    if (Utils.exists(controller)) {
      const index = this.$controllerData.indexOf(controller);
      this.$controllerData.splice(index, 1);
    } else {
      console.log(`Такой контроллер в системе не найден`);
    }
  }

  public getUserGroup(id: number) {
    return this.$userGroupData.filter((uGr) => uGr.id === id).length !== 0 ? this.$userGroupData.find((uGr) => uGr.id === id) : null;
  }

  public getUserGroups(): Array<UserGroup> {
    return this.$userGroupData;
  }

  public addUserGroup(name: string, description: string, parent: number) {
    let newId = this.findMaxIndex(this.$userGroupData) + 1;
    while (Utils.exists(this.getUserGroup(newId))) {
      newId++;
    }
    if (parent === 0) {
      parent = -1;
    }
    const userGroup = new UserGroup(newId, name, description, parent);
    this.$userGroupData.push(userGroup);
    return userGroup;
  }

  public updateUserGroup(id: number, name: string, desc: string, parent: number) {
    const userGroup = this.getUserGroup(id);
    userGroup.name = name;
    userGroup.description = desc;
    if (parent === 0) {
      parent = -1;
    }
    userGroup.parentId = parent;
  }

  public deleteUserGroup(id: number) {
    const userGroup = this.getUserGroup(id);
    if (Utils.exists(userGroup)) {
      const index = this.$userGroupData.indexOf(userGroup);
      this.$userGroupData.splice(index, 1);
    } else {
      console.log(`Такая группа пользователей в системе не найдена`);
    }
  }

  public getChildrenUserGroup(id: number): Array<UserGroup>  {
    return this.$userGroupData.filter((uGr) => uGr.parentId === id);
  }

  public getAllChildrenUserGroup(id: number): Array<UserGroup> {
    let group = this.getUserGroup(id);
    let children = Utils.pushAll([group], this.getChildrenUserGroup(id));
    if (children.length === 0) {
      return [];
    }
    children.forEach((ch) => {
      if (ch.id !== id) {
        const newChildren = this.getChildrenUserGroup(ch.id);
        if (newChildren.length !== 0) {
          children = Utils.pushAll(children, newChildren);
        }
      }
    });
    return children;
  }

  public getUsersByGroup(id: number) {
    return this.$userData.filter((us) => us.group === id);
  }

  public getUsersByChildrenGroup(id: number) {
    let users = [];
    const groups = this.getAllChildrenUserGroup(id);
    groups.forEach((gr) => {
      users = Utils.pushAll(users, this.getUsersByGroup(gr.id));
    });
    return users;
  }

  public getIntegratorsByGroup(id: number) {
    return this.$integratorData.filter((integr) => integr.group === id);
  }

  public getIntegratorsByChildrenGroup(id: number) {
    let integrators = [];
    const groups = this.getAllChildrenUserGroup(id);
    groups.forEach((gr) => {
      integrators = Utils.pushAll(integrators, this.getIntegratorsByGroup(gr.id));
    });
    return integrators;
  }

  public getScenarioController(id: number) {
    return this.$scenarioControllerData.filter((sC) => sC.id === id).length !== 0 ? this.$scenarioControllerData.find((sC) => sC.id === id) : null;
  }

  public getScenarioControllersByScenario(id: number) {
    return this.$scenarioControllerData.filter((sC) => sC.scenarioId === id).length !== 0 ? this.$scenarioControllerData.filter((sC) => sC.scenarioId === id) : null;
  }

  public getScenarioControllersByController(id: number) {
    return this.$scenarioControllerData.filter((sC) => sC.controllerId === id).length !== 0 ? this.$scenarioControllerData.filter((sC) => sC.controllerId === id) : null;
  }

  public getScenarioControllers() {
    return this.$scenarioControllerData;
  }

  public addScenarioController(scenarioId: number, controllerId: number, activated: boolean) {
    let newId = this.findMaxIndex(this.$scenarioControllerData) + 1;
    while (Utils.exists(this.getScenarioController(newId))) {
      newId++;
    }
    const scenContr = new ScenarioController(newId, scenarioId, controllerId, activated);
    this.$scenarioControllerData.push(scenContr);
    return scenContr;
  }

  public updateScenarioController(id: number, scenarioId: number, controllerId: number, activated: boolean) {
    const scenContr = this.getScenarioController(id);
    scenContr.scenarioId = scenarioId;
    scenContr.controllerId = controllerId;
    scenContr.activated = activated;
  }

  public deleteScenarioController(id: number) {
    const scenContr = this.getScenarioController(id);
    if (Utils.exists(scenContr)) {
      const index = this.$scenarioControllerData.indexOf(scenContr);
      this.$scenarioControllerData.splice(index, 1);
    } else {
      console.log(`Такая связь между контроллером и сценарием в системе не найдена`);
    }
  }
}
