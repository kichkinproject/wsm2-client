import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ControllerType, ThingType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';
import {Thing} from '../../../../models/thing';
import {User} from '../../../../models/user';

@Component({
  selector: 'wsm-thing-find',
  templateUrl: './thing-find.component.html',
  styleUrls: ['./thing-find.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ThingFindComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $type: ThingType;
  private $founded: boolean;
  private currentUser: User;
  public scTypes: Map<ThingType, string> = new Map<ThingType, string>( [
    [
      ThingType.THING_TYPE_1,
      'Первый тип датчика'
    ],
    [
      ThingType.THING_TYPE_2,
      'Второй тип датчика'
    ],
    [
      ThingType.THING_TYPE_3,
      'Третий тип датчика'
    ],
    [
      ThingType.THING_TYPE_4,
      'Четвертый тип датчика'
    ]
  ]);

  private newThings: Array<Thing> = [
    {
      id: 101,
      name: 'Устройство №1',
      description: 'Устройство №1',
      type: ThingType.THING_TYPE_1,
      master: -1,
      controller: -1,
    },
    {
      id: 102,
      name: 'Устройство №2',
      description: 'Устройство №2',
      type: ThingType.THING_TYPE_2,
      master: -1,
      controller: -1,
    },
    {
      id: 103,
      name: 'Устройство №3',
      description: 'Устройство №3',
      type: ThingType.THING_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 104,
      name: 'Устройство №4',
      description: 'Устройство №4',
      type: ThingType.THING_TYPE_4,
      master: -1,
      controller: -1,
    },
    {
      id: 105,
      name: 'Устройство №5',
      description: 'Устройство №5',
      type: ThingType.THING_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 106,
      name: 'Устройство №6',
      description: 'Устройство №6',
      type: ThingType.THING_TYPE_1,
      master: -1,
      controller: -1,
    },
    {
      id: 107,
      name: 'Устройство №7',
      description: 'Устройство №7',
      type: ThingType.THING_TYPE_2,
      master: -1,
      controller: -1,
    },
    {
      id: 108,
      name: 'Устройство №8',
      description: 'Устройство №8',
      type: ThingType.THING_TYPE_3,
      master: -1,
      controller: -1,
    },
    {
      id: 109,
      name: 'Устройство №9',
      description: 'Устройство №9',
      type: ThingType.THING_TYPE_4,
      master: -1,
      controller: -1,
    },
    {
      id: 110,
      name: 'Устройство №10',
      description: 'Устройство №10',
      type: ThingType.THING_TYPE_3,
      master: -1,
      controller: -1,
    },
  ];

  private $thingId: number;

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
    // this.thingId = +this.activatedRoute.params['_value']['id'];
    // const thing = this.dataService.getThing(this.thingId);
    // this.name = thing.name;
    // this.description = thing.description;
    // this.typeContr = this.scTypes.get(thing.type);
    // this.masterContr = this.dataService.getUserGroup(thing.master);
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get thingId() {
    return this.$thingId;
  }

  public set thingId(id: number) {
    if (Utils.exists(id) && isFinite(+id)) {
      this.$thingId = +id;
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

  public get typeThing() {
    return this.scTypes.get(this.$type);
  }

  public set typeThing(str: string) {
    if (Utils.exists(str)) {
      let okey: ThingType = null;
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

  public thingNotFound() {
    if (Utils.exists(this.$thingId)) {
      if (this.newThings.filter(cr => cr.id === this.$thingId).length !== 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public thingExisting() {
    if (Utils.exists(this.$thingId)) {
      const crs = this.dataService.getThingsByGroup(this.currentUser.group).filter(cr => cr.id === this.$thingId);
      if (crs.length === 0) {
        return false;
      } else {
        return true;
      }
      // if (this.dataService.getThingsByGroup(this.currentUser.group))
    } else {
      return true;
    }
  }

  public get thingFounded() {
    return this.$founded;
  }

  public set thingFounded(value: boolean) {
    this.$founded = value;
  }

  public findThing() {
    if (!this.thingNotFound() && !this.thingExisting()) {
      this.isCompleted$.next(false);
      const thing = this.newThings.find(ctr => ctr.id === this.$thingId);
      this.name = thing.name;
      this.description = thing.description;
      this.$type = thing.type;
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

  public addFoundedThing() {
    this.isCompleted$.next(false);
    this.dataService.addThing(this.$name, this.$description, this.$type, this.currentUser.group);
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
