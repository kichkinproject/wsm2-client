import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role} from '../../../../models/role';
import {ScenarioType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'wsm-scenario-view',
  templateUrl: './scenario-view.component.html',
  styleUrls: ['./scenario-view.component.scss']
})
export class ScenarioViewComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $script: string;
  private $publicity: boolean;
  private $type: ScenarioType;
  public scTypes: Map<ScenarioType, string> = new Map<ScenarioType, string>( [
    [
      ScenarioType.SCHEDULE_ACTION,
      'Выполнение по расписанию'
    ],
    [
      ScenarioType.SENSOR_ACTION,
      'Выполнение при определенных показателях датчика'
    ],
    [
      ScenarioType.USER_ACTION,
      'Выполнение по пользовательскому требованию'
    ]
  ]);

  private scenarioId: number;

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
    this.scenarioId = this.activatedRoute.params['id'];
    const scenario = this.dataService.getScenario(this.scenarioId);
    this.name = scenario.name;
    this.description = scenario.description;
    this.script = scenario.script;
    this.publicity = scenario.publicity;
    this.selectedType = this.scTypes.get(scenario.type);
    this.isCompleted$.next(true);
  }

  public defaultSelect() {
    this.selectedType = 'Выполнение по расписанию';
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

  public set selectedType(str: string) {
    if (Utils.exists(str)) {
      let okey: ScenarioType = null;
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

  public get selectedType() {
    return this.scTypes.get(this.$type);
  }

  public get publicity() {
    return this.$publicity;
  }

  public set publicity(val: boolean) {
    this.$publicity = val;
  }

  public get script() {
    return this.$script;
  }

  public set script(scr: string) {
    if (Utils.exists(this.$script)) {
      this.$script = scr;
    };
  }
}
