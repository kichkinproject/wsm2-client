import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {IAppConfig} from '../app.config';
import {AppConfigToken, AppStateToken} from '../models/token';
import {IAppState} from '../models/app-state';
import {User} from '../models/user';
import {Roles} from '../models/role';
import {ControllerType, ScenarioType, SensorType, ThingType} from '../models/entity-type';
import {Utils} from '../utils/utils';
import {Scenario} from '../models/scenario';
import {Thing} from '../models/thing';
import {Sensor} from '../models/sensor';
import {Controller} from '../models/controller';

const httpOptions: HttpHeaders = new HttpHeaders({
  'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root'
})
export class WsmDataService {
  constructor(protected http: HttpClient,
              @Inject(AppStateToken) protected appState: IAppState,
              @Inject(AppConfigToken) protected config: IAppConfig
  ) {
    // super(http, appState, aclService, alertsService, config),
    // super(http, appState, config);
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

  public getIntegrator(login: string) {
    return fetch(this.userUrl + '/' + login, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        return response;
      }
    });
  }

  public getIntegrators() {
    const integrators: Array<User> = [];
    fetch(this.userUrl + '/allIntegrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType !== 0).length !== 0) {
        response.filter(res => res.userType !== 0).forEach(res => {
          integrators.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.INTEGRATOR,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
    });
    return integrators;
  }

  // public getIntegrators2(): Array<User> {
  //   const users = this.http.get(`${baseApi}/${urlUser}/AllUsers`, httpOptions);
  //
  // }

  public addIntegrator(login: string, password: string, name: string, info: string, group: number) {

  }

  public updateIntegrator(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {

  }

  public deleteIntegrator(login: string) {

  }

  public getAdmin(login: string) {
    return fetch(this.adminUrl + '/' + login, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.log(response);
      if (response.ok && response.statusText !== 'No Content') {
        return response.json();
      } else {
        return response;
      }
    });
  }

  public getAdmins(): Array<User> {
    const admins: Array<User> = [];
    fetch(this.adminUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.login !== 'system_author').length !== 0) {
        response.filter(res => res.login !== 'system_author').forEach(res => {
          admins.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.ADMIN,
            -1
          ));
        });
      }
      console.log(admins);
    });
    return admins;
  }

  public addAdmin(login: string, password: string, name: string, info: string) {
    return fetch(this.adminUrl, {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info
      }),
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  public updateAdmin(login: string, password: string, name: string, info: string) {
    return fetch(this.adminUrl, {
      method: 'PUT',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info
      }),
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  public deleteAdmin(login: string) {
    return fetch(this.adminUrl + '/' + login, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response;
    });
  }

  public getSomeUser(login: string) {
   return [this.getAdmin(login), this.getUser(login)];
  }

  public getUser(login: string) {
    return fetch(this.userUrl + '/' + login, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      if (response.ok && response.statusText !== 'No Content') {
        return response.json();
      } else {
        return response;
      }
    });
  }

  public getSimple(login) {
    return fetch(this.userUrl + '/' + login, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      if (response.ok && response.statusText !== 'No Content') {
        return response.json();
      } else {
        return response;
      }
    });
  }

  public getUsers() {
    const users: Array<User> = [];
    fetch(this.userUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          users.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.SIMPLE,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
      console.log(users);
    });
    return users;
  }

  public addUser(login: string, password: string, name: string, info: string, group: number) {

  }

  public updateUser(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {

  }

  public deleteUser(login: string) {

  }

  public getScenario(id: number) {

  }

  // public getScenarios() {
  //   const users: Array<User> = [];
  //   fetch(this.scenarioUrl, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
  //       'Content-Type': 'application/json'
  //     },
  //   }).then(function(response) {
  //     console.log(response);
  //     return response.json();
  //   }).then((response) => {
  //     console.log(response);
  //     if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
  //       response.filter(res => res.userType === 0).forEach(res => {
  //         users.push(new User(
  //           res.login,
  //           '',
  //           res.fio,
  //           '',
  //           Roles.SIMPLE,
  //           Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
  //         ));
  //       });
  //     }
  //     console.log(users);
  //   });
  //   return users;
  // }

  public getPublicScenarios() {
    const scenarios: Array<Scenario> = [];
      fetch(this.scenarioUrl + '/public', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
          'Content-Type': 'application/json'
        },
      }).then(function(response) {
        console.log(response);
        return response.json();
      }).then((response) => {
        console.log(response);
        if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
          response.filter(res => res.userType === 0).forEach(res => {
            scenarios.push(new Scenario(
              res.id,
              res.name,
              res.description,
              res.text,
              ScenarioType.USER_ACTION,
              true,
              Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
            ));
          });
        }
        console.log(scenarios);
      });
      return scenarios;
  }

  public getPrivateScenarios() {
    const scenarios: Array<Scenario> = [];
    fetch(this.scenarioUrl + '/available', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          scenarios.push(new Scenario(
            res.id,
            res.name,
            res.description,
            res.text,
            ScenarioType.USER_ACTION,
            true,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
      console.log(scenarios);
    });
    return scenarios;
  }

  public findMaxIndex(objects: any[]) {

  }

  public addScenario(name: string, description: string, script: string, type: ScenarioType, publicity: boolean, creator: string = '') {

  }

  public updateScenario(id: number, name: string, description: string, script: string, type: ScenarioType, publicity: boolean) {

  }

  public duplicateScenario(id: number, creator: string, publicity: boolean = false) {

  }

  public getScenarioByCreator(login: string) {

  }

  public deleteScenario(id: number) {

  }

  public getSensor(id: number) {

  }

  public getSensors() {
    const sensors: Array<Sensor> = [];
    fetch(this.sensorUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          sensors.push(new Sensor(
            res.id,
            res.name,
            res.description,
            res.type,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1,
            res.controllerId
          ));
        });
      }
      console.log(sensors);
    });
    return sensors;
  }

  public getSensorsByGroup(id: number) {

  }

  public getSensorsByController(id: number) {

  }

  public addSensor(name: string, description: string, type: SensorType, master: number, controller: number = -1) {

  }

  public createSensorControllerLink(id: number, controller: number) {

  }

  public destroySensorControllerLink(id: number) {

  }

  public deleteSensor(id: number) {

  }

  public getThing(id: number) {

  }

  public getThings() {
    const things: Array<Thing> = [];
    fetch(this.thingUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          things.push(new Thing(
            res.id,
            res.name,
            res.description,
            res.type,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1,
            res.controllerId
          ));
        });
      }
      console.log(things);
    });
    return things;
  }

  public getThingsByGroup(id: number) {

  }

  public getThingsByController(id: number) {

  }

  public addThing(name: string, description: string, type: ThingType, master: number, controller: number = -1) {

  }

  public createThingControllerLink(id: number, controller: number) {

  }

  public destroyThingControllerLink(id: number) {

  }

  public deleteThing(id: number) {

  }

  public getController(id: number) {

  }

  public getControllers() {
    const controllers: Array<Controller> = [];
    fetch(this.thingUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          controllers.push(new Controller(
            res.id,
            res.name,
            res.description,
            res.type,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1,
          ));
        });
      }
      console.log(controllers);
    });
    return controllers;
  }


  public getControllersByGroup(id: number) {

  }

  public addController(name: string, description: string, type: ControllerType, master: number) {

  }

  public deleteController(id: number) {

  }

  public getUserGroup(id: number) {

  }

  public getUserGroups() {

  }

  public addUserGroup(name: string, description: string, parent: number) {

  }

  public updateUserGroup(id: number, name: string, desc: string, parent: number) {

  }

  public deleteUserGroup(id: number) {

  }

  public getChildrenUserGroup(id: number)  {

  }

  public getAllChildrenUserGroup(id: number) {

  }

  public getUsersByGroup(id: number) {

  }

  public getUsersByChildrenGroup(id: number) {

  }

  public getIntegratorsByGroup(id: number) {
    const integrators: Array<User> = [];
    fetch(this.userUrl + '/allIntegrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userGroup.id === id).length !== 0) {
        response.filter(res => res.userGroup.id === id).forEach(res => {
          integrators.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.INTEGRATOR,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
    });
    return integrators;
  }

  public getIntegratorsByChildrenGroup(id: number) {
    const integrators: Array<User> = [];
    fetch(this.userUrl + '/allIntegrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userGroup.id === id).length !== 0) {
        response.filter(res => res.userGroup.id === id).forEach(res => {
          integrators.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.INTEGRATOR,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
    });
    return integrators;
  }

  public getScenarioController(id: number) {

  }

  public getScenarioControllersByScenario(id: number) {

  }

  public getScenarioControllersByController(id: number) {

  }

  public getScenarioControllers() {

  }

  public addScenarioController(scenarioId: number, controllerId: number, activated: boolean) {

  }

  public updateScenarioController(id: number, scenarioId: number, controllerId: number, activated: boolean) {

  }

  public deleteScenarioController(id: number) {

  }
}
