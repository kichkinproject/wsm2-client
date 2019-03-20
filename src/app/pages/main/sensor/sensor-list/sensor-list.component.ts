import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {Scenario} from '../../../../models/scenario';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';

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
  private sensors: Array<Scenario> = [];
  private baseRole = Roles;


  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    const integrators: Array<User> = [];
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.sensors.slice(0, this.sensors.length);
        break;
      case Roles.INTEGRATOR:
        this.sensors = Utils.pushAll([], this.dataService.getSensorsByGroup(user.group));
        break;
      case Roles.SIMPLE:
        this.sensors.slice(0, this.sensors.length);
        break;
      default:
        this.sensors.slice(0, this.sensors.length);
        break;
    }
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public findNewSensor() {
    this.router.navigate(['main/sensor/sensor-find'], {
      queryParams: {}
    });
  }

  public createReportOnSensors() {
    alert('Блок отчетности по датчикам недоступен');
  }

  public updateSensorList() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public viewSensor(id: number) {
    if (Utils.exists(this.dataService.getSensor(id))) {
      this.router.navigate(['main/sensor/sensor-view', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующий датчик');
    }
  }

  public removeSensor(id: number) {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.dataService.deleteSensor(id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
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
