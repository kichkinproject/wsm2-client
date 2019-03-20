import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { Role, Roles } from "../../../../models/role";
import {ScenarioType, SensorType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';

@Component({
  selector: 'wsm-sensor-view',
  templateUrl: './sensor-view.component.html',
  styleUrls: ['./sensor-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SensorViewComponent  implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $type: SensorType;
  private $master: number;
  public scTypes: Map<SensorType, string> = new Map<SensorType, string>( [
    [
      SensorType.SENSOR_TYPE_1,
      'Первый тип датчика'
    ],
    [
      SensorType.SENSOR_TYPE_2,
      'Второй тип датчика'
    ],
    [
      SensorType.SENSOR_TYPE_3,
      'Третий тип датчика'
    ],
    [
      SensorType.SENSOR_TYPE_4,
      'Четвертый тип датчика'
    ]
  ]);

  private sensorId: number;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.sensorId = +this.activatedRoute.params['_value']['id'];
    const sensor = this.dataService.getSensor(this.sensorId);
    this.name = sensor.name;
    this.description = sensor.description;
    this.typeSensor = this.scTypes.get(sensor.type);
    this.masterSensor = this.dataService.getUserGroup(sensor.master);
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get name() {
    return this.$name;
  }

  public set name(str: string) {
    if (Utils.exists(str)) {
      this.$name = str;
    }
  }

  public get description() {
    return this.$description;
  }

  public set description(str: string) {
    if (Utils.exists(str)) {
      this.$description = str;
    }
  }

  public set typeSensor(str: string) {
    if (Utils.exists(str)) {
      let okey: SensorType = null;
      this.scTypes.forEach((value, key) => {
        if (value === str) {
          okey = key;
        }
      });
      if (Utils.exists(okey)) {
        this.$type = okey;
      }
    }
  }

  public get typeSensor() {
    return this.scTypes.get(this.$type);
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public set masterSensor(uGr: UserGroup) {
    if (Utils.exists(uGr)) {
      this.$master = uGr.id;

    }
  }

  public get masterSensor() {
    return this.dataService.getUserGroup(this.$master);
  }

}
