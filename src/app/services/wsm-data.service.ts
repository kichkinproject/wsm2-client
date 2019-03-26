import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { IAppConfig } from '../app.config';
import { AppConfigToken, AppStateToken } from "../models/token";
import {Observable, throwError} from 'rxjs';
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
import {HttpParamsOptions} from '@angular/common/http/src/params';
import {catchError, flatMap, map} from 'rxjs/operators';

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




  public getIntegrator(login: string): User {

  }

  public getIntegrators(): Array<User> {

  }

  // public getIntegrators2(): Array<User> {
  //   const users = this.http.get(`${baseApi}/${urlUser}/AllUsers`, httpOptions);
  //
  // }

  public addIntegrator(login: string, password: string, name: string, info: string, group: number): User {

  }

  public updateIntegrator(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {

  }

  public deleteIntegrator(login: string) {

  }

  public getAdmin(login: string): User {

  }

  public getAdmins() {
    // return fetch(this.adminUrl, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': 'Bearer ' + window.sessionStorage.getItem('access'),
    //     'Content-Type': 'application/json'
    //   },
    // }).then(function(response) {
    //   console.log(response);
    //   return response.json();
    // });
    return this.http.get(this.adminUrl, httpOptions)
      .pipe(map((data: any) => data.result ),
      catchError(error => {
        return throwError('Its a Trap!');
      })
    );

  }

  public addAdmin(login: string, password: string, name: string, info: string): User {

  }

  public updateAdmin(oldLogin: string, login: string, password: string, name: string, info: string) {

  }

  public deleteAdmin(login: string) {

  }

  public getSomeUser(login: string) {

  }

  public getUser(login: string): User {

  }

  public getUsers(): Array<User> {

  }

  public addUser(login: string, password: string, name: string, info: string, group: number): User {

  }

  public updateUser(oldLogin: string, login: string, password: string, name: string, info: string, group: number) {

  }

  public deleteUser(login: string) {

  }

  public getScenario(id: number): Scenario {

  }

  public getScenarios(): Array<Scenario> {

  }

  public getPublicScenarios(): Array<Scenario> {

  }

  public getPrivateScenarios(): Array<Scenario> {

  }

  public findMaxIndex(objects: any[]) {

  }

  public addScenario(name: string, description: string, script: string, type: ScenarioType, publicity: boolean, creator: string = ''): Scenario {

  }

  public updateScenario(id: number, name: string, description: string, script: string, type: ScenarioType, publicity: boolean) {

  }

  public duplicateScenario(id: number, creator: string, publicity: boolean = false) {

  }

  public getScenarioByCreator(login: string) {

  }

  public deleteScenario(id: number) {

  }

  public getSensor(id: number): Sensor {

  }

  public getSensors(): Array<Sensor> {

  }

  public getSensorsByGroup(id: number): Array<Sensor> {

  }

  public getSensorsByController(id: number): Array<Sensor> {

  }

  public addSensor(name: string, description: string, type: SensorType, master: number, controller: number = -1): Sensor {

  }

  public createSensorControllerLink(id: number, controller: number) {

  }

  public destroySensorControllerLink(id: number) {

  }

  public deleteSensor(id: number) {

  }

  public getThing(id: number): Thing {

  }

  public getThings(): Array<Thing> {

  }

  public getThingsByGroup(id: number): Array<Thing> {

  }

  public getThingsByController(id: number): Array<Thing> {

  }

  public addThing(name: string, description: string, type: ThingType, master: number, controller: number = -1): Thing {

  }

  public createThingControllerLink(id: number, controller: number) {

  }

  public destroyThingControllerLink(id: number) {

  }

  public deleteThing(id: number) {

  }

  public getController(id: number): Controller {

  }

  public getControllers(): Array<Controller> {

  }


  public getControllersByGroup(id: number) {

  }

  public addController(name: string, description: string, type: ControllerType, master: number): Controller {

  }

  public deleteController(id: number) {

  }

  public getUserGroup(id: number) {

  }

  public getUserGroups(): Array<UserGroup> {

  }

  public addUserGroup(name: string, description: string, parent: number) {

  }

  public updateUserGroup(id: number, name: string, desc: string, parent: number) {

  }

  public deleteUserGroup(id: number) {

  }

  public getChildrenUserGroup(id: number): Array<UserGroup>  {

  }

  public getAllChildrenUserGroup(id: number): Array<UserGroup> {

  }

  public getUsersByGroup(id: number) {

  }

  public getUsersByChildrenGroup(id: number) {

  }

  public getIntegratorsByGroup(id: number) {

  }

  public getIntegratorsByChildrenGroup(id: number) {

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
