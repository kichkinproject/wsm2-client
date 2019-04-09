import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {Scenario} from '../../../../models/scenario';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';
import { Controller } from "../../../../models/controller";
import { Sensor } from "../../../../models/sensor";
import {WsmDataService} from '../../../../services/wsm-data.service';
import { Thing } from "../../../../models/thing";

@Component({
  selector: 'wsm-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SensorListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private sensors: Array<Sensor> = [];
  private baseRole = Roles;
  private controllers: Array<Controller> = [];
  private controllerHidden: Map<number, boolean> = new Map<number, boolean>();
  private controllerSensors: Map<number, Array<Sensor>> = new Map<number, Array<Sensor>>();

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private serviceData: WsmDataService,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    // const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    // this.sensors = [];
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.sensors.slice(0, this.sensors.length);
        break;
      case Roles.INTEGRATOR:
        this.isCompleted$.next(false);
        this.sensors = [];
        this.serviceData.getIntegrator(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getSensorsByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    response1.forEach(res1 => {
                      this.sensors.push(new Sensor(res1.id,
                        res1.name,
                        res1.description,
                        res1.type,
                        res1.userGroupId,
                        res1.controllerId));
                    });
                  }
                  this.isCompleted$.next(true);
                  this.cd.detectChanges();
                });
            }
          });
        break;
      case Roles.SIMPLE:
        this.isCompleted$.next(false);
        this.controllers = [];
        this.serviceData.getUser(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getControllersByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    response1.forEach(res1 => {
                      this.controllers.push(new Controller(res1.id,
                        res1.name,
                        res1.description,
                        res1.type,
                        res1.userGroupId));
                    });
                  }
                  this.controllerHidden.clear();
                  this.controllerSensors.clear();
                  if (this.controllers.length !== 0) {
                    let i = 0;
                    this.controllers.forEach((cnt) => {
                      this.controllerHidden.set(cnt.id, true);
                      this.serviceData.getSensorsByController(cnt.id)
                        .then(response2 => {
                          if (response2.length !== 0) {
                            const contrSensors: Array<Sensor> = new Array<Sensor>();
                            response2.forEach(res2 => {
                              contrSensors.push(new Sensor(res2.id,
                                res2.name,
                                res2.description,
                                res2.type,
                                res2.userGroupId,
                                res2.controllerId));
                            });
                            this.controllerSensors.set(cnt.id, contrSensors);
                          }
                        });
                      i++;
                      if (i === this.controllers.length) {
                        this.isCompleted$.next(true);
                        this.cd.detectChanges();
                      }
                    });
                  } else {
                    this.isCompleted$.next(true);
                    this.cd.detectChanges();
                  }
                });
            }
          });
        break;
      default:
        this.sensors.slice(0, this.sensors.length);
        break;
    }
  }

  public hidden(id: number) {
    return this.controllerHidden.get(id);
  }

  public shareControllersSensors(id: number) {
    return this.controllerHidden.set(id, false);
  }

  public hideControllersSensors(id: number) {
    return this.controllerHidden.set(id, true);
  }

  public controllerSens(id: number) {
    return this.controllerSensors.get(id);
  }

  public ngAfterViewInit() {
    // this.cd.detectChanges();
    this.updateCollection();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public findNewSensor() {
    this.router.navigate(['main/sensor/sensor-find'], {
      queryParams: {}
    });
  }

  public createLinkController(id) {
    this.serviceData.getThing(id)
      .then((response) => {
        this.router.navigate(['main/sensor/sensor-controller-link', id.toString()], {
          queryParams: {}
        });
      })
      .catch((response) => {
        console.log('Ошибка, хотим настроить связь несуществующему датчику');

      });
    // this.dataService.createSensorControllerLink()
  }

  public destroyLinkController(id) {
    this.serviceData.destroySensorControllerLink(id)
      .then((response) => {
        this.updateCollection();
      });
  }

  public createReportOnSensors() {
    alert('Блок отчетности по датчикам недоступен');
  }

  public updateSensorList() {
    // this.cd.detectChanges();
    this.updateCollection();
  }

  public viewSensor(id: number) {
    this.serviceData.getSensor(id)
      .then((response) => {
        this.router.navigate(['main/sensor/sensor-view', id.toString()], {
          queryParams: {}
        });
      })
      .catch(error => {
        console.log('Ошибка, хотим просмотреть не существующий датчик');
      });
  }

  public removeSensor(id: number) {
    // this.cd.detectChanges();
    this.serviceData.deleteSensor(id)
      .then(response => {
        this.updateCollection();
      });
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.sensors.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }


}
