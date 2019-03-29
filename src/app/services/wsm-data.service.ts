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
import { UserGroup } from "../models/user-group";

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

  private accountUrl = `${this.config.WebApiUrl}/account`;
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
    return fetch(this.userUrl + '/single/' + login, {
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
    return fetch(this.userUrl + '/allIntegrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    });
  }

  // public getIntegrators2(): Array<User> {
  //   const users = this.http.get(`${baseApi}/${urlUser}/AllUsers`, httpOptions);
  //
  // }

  public addIntegrator(login: string, password: string, name: string, info: string, group: number) {
    return fetch(this.adminUrl + '/user', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info,
        userGroupId: group,
        userType: 1
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

  public updateIntegrator(login: string, password: string, name: string, info: string, group: number) {
    return fetch(this.userUrl, {
      method: 'PUT',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info,
        userGroup: group,
        userType: 1
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

  public updateIntegratorWithPassword(login: string, oldPass: string, newPass: string, name: string, info: string, group: number) {
    return fetch(this.accountUrl + '/changePassword', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        previousPassword: oldPass,
        newPassword: newPass
      }),
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => this.updateIntegrator(login, newPass, name, info, group));
  }

  public deleteIntegrator(login: string) {
    return fetch(this.userUrl + '/' + login, {
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

  public getAdmins() {
    return fetch(this.adminUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
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

  public updateAdminWithPassword(login: string, oldPass: string, newPass: string, name: string, info: string) {
    return fetch(this.accountUrl + '/changePassword', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        previousPassword: oldPass,
        newPassword: newPass
      }),
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => this.updateAdmin(login, newPass, name, info));
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
    return fetch(this.userUrl + '/single/' + login, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
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

  public getSimples() {
    const simples: Array<User> = [];
    fetch(this.userUrl + '/allSimpleUsers', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userType === 0).length !== 0) {
        response.filter(res => res.userType === 0).forEach(res => {
          simples.push(new User(
            res.login,
            '',
            res.fio,
            res.info,
            Roles.SIMPLE,
            Utils.exists(response.userGroup.id) ? response.userGroup.id : -1
          ));
        });
      }
    });
    return simples;
  }

  public getUsers() {
    return fetch(this.userUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  public addUser(login: string, password: string, name: string, info: string, group: number) {
    return fetch(this.userUrl, {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info,
        userGroupId: group,
        userType: 0
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

  public updateUser(login: string, password: string, name: string, info: string, group: number) {
    return fetch(this.userUrl, {
      method: 'PUT',
      body: JSON.stringify({
        login: login,
        fio: name,
        password: password,
        info: info,
        userGroup: group,
        userType: 0
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

  public updateUserWithPassword(login: string, oldPass: string, newPass: string, name: string, info: string, group: number) {
    return fetch(this.accountUrl + '/changePassword', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        previousPassword: oldPass,
        newPassword: newPass
      }),
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => this.updateUser(login, newPass, name, info, group));
  }

  public deleteUser(login: string) {
    return fetch(this.userUrl + '/' + login, {
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

  public getScenario(id: number) {
    return fetch(this.scenarioUrl + '/' + id.toString(), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok && response.statusText !== 'No Content') {
        return response.json();
      } else {
        return response;
      }
    });
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
        if (response.length !== 0) {
          response.forEach(res => {
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
    fetch(this.scenarioUrl + '/children', {
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
      if (response.length !== 0) {
        response.forEach(res => {
          scenarios.push(new Scenario(
            res.id,
            res.name,
            res.description,
            res.text,
            ScenarioType.USER_ACTION,
            true,
            Utils.exists(response.userGroupId) ? response.userGroupId : -1
          ));
        });
      }
      console.log(scenarios);
    });
    return scenarios;
  }

  public addScenario(name: string, description: string, script: string, type: ScenarioType, publicity: boolean, creator: string = '', userGroup: number) {
    return fetch(this.scenarioUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        script: script,
        author:creator,
        type: type,
        publicity: publicity,
        userGroupId: userGroup
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

  public updateScenario(id: number, name: string, description: string, script: string, type: ScenarioType, publicity: boolean) {
    return fetch(this.scenarioUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: name,
        description: description,
        script: script,
        // author: creator,
        type: type,
        publicity: publicity
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

  public duplicateScenario(id: number, creator: string, publicity: boolean = false, userGroup) {
    this.getScenario(id)
      .then((response) => {
        if (Utils.exists(response.ok)) {
          this.addScenario(
            response.name,
            response.description,
            response.script,
            response.type,
            publicity,
            creator,
            userGroup
        )
            .then((response) => {
              if (response.ok || response.statusText !== 'No Content') {
                console.log(response);
                return response.json();
              } else {
                return response;
              }
            });
        } else {
          console.log('Нет такого сценария');
        }
      });
  }

  public getScenarioByCreator(login: string) {
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
      if (response.length !== 0) {
        response.forEach(res => {
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

  public deleteScenario(id: number) {
    return fetch(this.scenarioUrl + '/' + id.toString(0), {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  public getSensor(id: number) {
    return fetch(this.sensorUrl + '/' + id, {
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

  public getSensors() {
    return fetch(this.sensorUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  public getSensorsByGroup(id: number) {
    return fetch(this.sensorUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userGroup.id === id).length !== 0) {
        return response.filter(res => res.userGroup.id === id);
      } else {
        return [];
      }
    });
  }

  public getSensorsByController(id: number) {
    return fetch(this.sensorUrl, {
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
      if (response.length !== 0 && response.filter(res => res.controllerId === id).length !== 0) {
        response.filter(res => res.controllerId === id)
      } else {
        return [];
      }
    });
  }

  public addSensor(name: string, description: string, type: SensorType, master: number, controller: number = -1) {
    return fetch(this.sensorUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        type: type,
        userGroupId: master,
        controllerId: controller
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

  public createSensorControllerLink(id: number, controller: number) {
    return this.getSensor(id)
      .then((response) => {
        if (Utils.missing(response.ok)) {
          return fetch(this.sensorUrl, {
            method: 'PUT',
            body: JSON.stringify({
              name: response.name,
              description: response.description,
              type: response.type,
              userGroupId: response.master,
              controllerId: controller
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
      });
  }

  public destroySensorControllerLink(id: number) {
    return this.getSensor(id)
      .then((response) => {
        if (Utils.missing(response.ok)) {
          return fetch(this.sensorUrl, {
            method: 'PUT',
            body: JSON.stringify({
              name: response.name,
              description: response.description,
              type: response.type,
              userGroupId: response.master,
              controllerId: -1
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
      });
  }

  public deleteSensor(id: number) {
    return fetch(this.sensorUrl + '/' + id.toString(), {
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

  public getThing(id: number) {
    return fetch(this.thingUrl + '/' + id, {
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
      if (response.length !== 0) {
        response.forEach(res => {
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
    return fetch(this.thingUrl, {
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
      if (response.length !== 0 && response.filter(res => res.userGroupId === id).length !== 0) {
        return response.filter(res => res.userGroupId === id);
      } else {
        return response;
      }
    });
  }

  public getThingsByController(id: number) {
    return fetch(this.thingUrl, {
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
      if (response.length !== 0 && response.filter(res => res.controllerId === id).length !== 0) {
        return response.filter(res => res.controllerId === id);
      } else {
        return response;
      }
    });
  }

  public addThing(name: string, description: string, type: ThingType, master: number, controller: number = -1) {
    return fetch(this.thingUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        type: type,
        userGroupId: master,
        controllerId: controller
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

  public createThingControllerLink(id: number, controller: number) {
    return this.getThing(id)
      .then((response) => {
        if (Utils.missing(response.ok)) {
          return fetch(this.thingUrl, {
            method: 'PUT',
            body: JSON.stringify({
              name: response.name,
              description: response.description,
              type: response.type,
              userGroupId: response.master,
              controllerId: controller
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
      });
  }

  public destroyThingControllerLink(id: number) {
    return this.getThing(id)
      .then((response) => {
        if (Utils.missing(response.ok)) {
          return fetch(this.userUrl, {
            method: 'PUT',
            body: JSON.stringify({
              name: response.name,
              description: response.description,
              type: response.type,
              userGroupId: response.master,
              controllerId: -1
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
      });
  }

  public deleteThing(id: number) {
    return fetch(this.thingUrl + '/' + id.toString(), {
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

  public getController(id: number) {
    return fetch(this.controllerUrl + '/' + id, {
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

  public getControllers() {
    const controllers: Array<Controller> = [];
    fetch(this.controllerUrl, {
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
      if (response.length !== 0) {
        response.forEach(res => {
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
    return fetch(this.controllerUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((response) => {
      console.log(response);
      if (response.length !== 0 && response.filter(res => res.userGroup.id === id).length !== 0) {
        return response.filter(res => res.userGroup.id === id);
      } else {
        return response;
      }
    });
  }

  public addController(name: string, description: string, type: ControllerType, master: number) {
    return fetch(this.controllerUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        type: type,
        userGroupId: master,
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

  public deleteController(id: number) {
    return fetch(this.controllerUrl + '/' + id.toString(), {
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

  public getUserGroup(id: number) {
    return fetch(this.userGroupUrl + '/byId/' + id.toString(), {
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

  public getUserGroups2() {
    return fetch(this.userGroupUrl + '/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      return response;
    });
  }

  // public getUserGroups() {
  //   const userGroups: Array<UserGroup> = [];
  //
  //   this.getUserGroups2().then((response) => {
  //     if (Utils.exists(respone.ok)) {
  //       const resp = response.json;
  //     }
  //     console.log(response);
  //     if (response.length !== 0) {
  //       response.forEach(res => {
  //         userGroups.push(new UserGroup(
  //           res.id,
  //           res.name,
  //           res.description,
  //           Utils.exists(response.parentGroupId) ? response.parentGroupId : -1
  //         ));
  //       });
  //     }
  //     console.log(userGroups);
  //   });
  //   return userGroups;
  // }

  public addUserGroup(name: string, description: string, parent: number) {
    return fetch(this.userGroupUrl, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        description: description,
        parentGroupId: parent !== -1 ? parent : null,
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

  public updateUserGroup(id: number, name: string, desc: string, parent: number) {
    return fetch(this.userGroupUrl, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        name: name,
        description: desc,
        parentGroupId: parent !== -1 ? parent : null
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

  public deleteUserGroup(id: number) {
    return fetch(this.userGroupUrl + '/' + id.toString(), {
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

  public getAllChildrenUserGroup2() {
    return fetch(this.userGroupUrl + '/children', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  // public getAllChildrenUserGroup(id: number) {
  //   const userGroups: Array<UserGroup> = [];
  //   this.getAllChildrenUserGroup2(id)
  //     .then((response) => {
  //     console.log(response);
  //     if (response.length !== 0) {
  //       response.forEach(res => {
  //         userGroups.push(new UserGroup(
  //           res.id,
  //           res.name,
  //           res.description,
  //           Utils.exists(response.parentGroupId) ? response.parentGroupId : -1
  //         ));
  //       });
  //     }
  //     console.log(userGroups);
  //   });
  //   return userGroups;
  // }

  public getUsersByGroup(id: number) {
    const users: Array<User> = [];
    fetch(this.userUrl + '/allSimpleUsers', {
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
      if (response.length !== 0 && response.filter(res => res.userGroup.id === id).length !== 0) {
        response.filter(res => res.userGroup.id === id).forEach(res => {
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

  public getUsersByChildrenGroup() {
    return fetch(this.userUrl + '/children/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  public getIntegratorsByGroup(id: number) {
    fetch(this.userUrl + '/allIntegrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      return response.json();
    }).then((response) => {
      console.log(response);
      return response.filter(res => res.userGroup.id === id);
    });
  }

  public getIntegratorsByChildrenGroup() {
    return fetch(this.userUrl + '/children/integrators', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
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
