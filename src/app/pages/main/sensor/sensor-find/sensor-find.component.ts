import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ControllerType, SensorType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';
import {Sensor} from '../../../../models/sensor';
import {User} from '../../../../models/user';

@Component({
  selector: 'wsm-sensor-find',
  templateUrl: './sensor-find.component.html',
  styleUrls: ['./sensor-find.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SensorFindComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $type: SensorType;
  private $founded: boolean;
  private currentUser: User;
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

  private newSensors: Array<Sensor> = [
    {
      id: 101,
      name: 'Датчик №1',
      description: 'Датчик №1',
      type: SensorType.SENSOR_TYPE_1,
      master: -1,
      controller: -1,
    },
    {
      id: 102,
      name: 'Датчик №2',
      description: 'Датчик №2',
      type: SensorType.SENSOR_TYPE_2,
      master: -1,
      controller: -1,
    },
    {
      id: 103,
      name: 'Датчик №3',
      description: 'Датчик №3',
      type: SensorType.SENSOR_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 104,
      name: 'Датчик №4',
      description: 'Датчик №4',
      type: SensorType.SENSOR_TYPE_4,
      master: -1,
      controller: -1,
    },
    {
      id: 105,
      name: 'Датчик №5',
      description: 'Датчик №5',
      type: SensorType.SENSOR_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 106,
      name: 'Датчик №6',
      description: 'Датчик №6',
      type: SensorType.SENSOR_TYPE_1,
      master: -1,
      controller: -1,
    },
    {
      id: 107,
      name: 'Датчик №7',
      description: 'Датчик №7',
      type: SensorType.SENSOR_TYPE_2,
      master: -1,
      controller: -1,
    },
    {
      id: 108,
      name: 'Датчик №8',
      description: 'Датчик №8',
      type: SensorType.SENSOR_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 109,
      name: 'Датчик №9',
      description: 'Датчик №9',
      type: SensorType.SENSOR_TYPE_4,
      master: -1,
      controller: -1,
    },
    {
      id: 110,
      name: 'Датчик №10',
      description: 'Датчик №10',
      type: SensorType.SENSOR_TYPE_3,
      master: -1,
      controller: -1,
    },
  ];

  private $sensorId: number;

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
    this.currentUser = this.dataService.getIntegrator(this.$user.getValue().user_login);
    this.$founded = false;
    // this.cd.detectChanges();
    // this.sensorId = +this.activatedRoute.params['_value']['id'];
    // const sensor = this.dataService.getSensor(this.sensorId);
    // this.name = sensor.name;
    // this.description = sensor.description;
    // this.typeContr = this.scTypes.get(sensor.type);
    // this.masterContr = this.dataService.getUserGroup(sensor.master);
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get sensorId() {
    return this.$sensorId;
  }

  public set sensorId(id: number) {
    if (Utils.exists(id) && isFinite(+id)) {
      this.$sensorId = +id;
    }
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

  public get typeSensor() {
    return this.scTypes.get(this.$type);
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

  public sensorNotFound() {
    if (Utils.exists(this.$sensorId)) {
      if (this.newSensors.filter(cr => cr.id === this.$sensorId).length !== 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public sensorExisting() {
    if (Utils.exists(this.$sensorId)) {
      const crs = this.dataService.getSensorsByGroup(this.currentUser.group).filter(cr => cr.id === this.$sensorId);
      if (crs.length === 0) {
        return false;
      } else {
        return true;
      }
      // if (this.dataService.getSensorsByGroup(this.currentUser.group))
    } else {
      return true;
    }
  }

  public get sensorFounded() {
    return this.$founded;
  }

  public set sensorFounded(value: boolean) {
    this.$founded = value;
  }

  public findSensor() {
    if (!this.sensorNotFound() && !this.sensorExisting()) {
      this.isCompleted$.next(false);
      const sensor = this.newSensors.find(ctr => ctr.id === this.$sensorId);
      this.name = sensor.name;
      this.description = sensor.description;
      this.$type = sensor.type;
      this.$founded = true;
      this.isCompleted$.next(true);
      this.cd.detectChanges();
    } else {
      this.isCompleted$.next(false);
      this.$founded = false;
      this.isCompleted$.next(true);
      this.cd.detectChanges();
    }
  }

  public addFoundedSensor() {
    this.isCompleted$.next(false);
    this.dataService.addSensor(this.$name, this.$description, this.$type, this.currentUser.group);
    this.$founded = false;
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }
}
