import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role} from '../../../../models/role';
import {ScenarioType, SensorType, ThingType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';

@Component({
  selector: 'wsm-thing-view',
  templateUrl: './thing-view.component.html',
  styleUrls: ['./thing-view.component.scss']
})
export class ThingViewComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $master: number;
  private $type: ThingType;
  public scTypes: Map<ThingType, string> = new Map<ThingType, string>( [
    [
      ThingType.THING_TYPE_1,
      'Первый тип устройств'
    ],
    [
      ThingType.THING_TYPE_2,
      'Второй тип устройств'
    ],
    [
      ThingType.THING_TYPE_3,
      'Третий тип устройств'
    ],
    [
      ThingType.THING_TYPE_4,
      'Четвертый тип устройств'
    ]
  ]);

  private thingId: number;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.thingId = this.activatedRoute.params['id'];
    const thing = this.dataService.getThing(this.thingId);
    this.name = thing.name;
    this.description = thing.description;
    this.typeThing = this.scTypes.get(thing.type);
    this.masterThing = this.dataService.getUserGroup(thing.master);
    this.isCompleted$.next(true);
  }

  public defaultSelect() {
    this.typeThing = 'Выполнение по расписанию';
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

  public get typeThing() {
    return this.scTypes.get(this.$type);
  }

  public set masterThing(uGr: UserGroup) {
    if (Utils.exists(uGr)) {
      this.$master = uGr.id;

    }
  }

  public get masterThing() {
    return this.dataService.getUserGroup(this.$master);
  }


}
