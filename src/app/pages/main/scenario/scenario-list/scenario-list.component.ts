import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Scenario} from '../../../../models/scenario';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';
import {ScenarioType} from '../../../../models/entity-type';
import {Controller} from '../../../../models/controller';

@Component({
  selector: 'wsm-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ScenarioListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private scenarios: Array<Scenario> = [];
  private baseRole = Roles;
  private controllers: Array<Controller> = [];

  public role() {
    return this.$user.getValue().user_role;
  }

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
    let integrators: Array<User> = [];
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.dataService.getScenarios().forEach((scen) => this.scenarios.push(scen));
        break;
      case Roles.INTEGRATOR:
        integrators = Utils.pushAll([], this.dataService.getIntegratorsByChildrenGroup(user.group));
        if (integrators.length !== 0) {
          integrators.forEach((integr) => {
            this.scenarios = Utils.pushAll([], this.dataService.getScenarioByCreator(integr.login));
          });
        }
        break;
      case Roles.SIMPLE:
        this.controllers = Utils.pushAll([], this.dataService.getControllersByGroup(user.group));
        integrators = Utils.pushAll([], this.dataService.getIntegratorsByGroup(user.group));
        if (integrators.length !== 0) {
          integrators.forEach((integr) => {
            this.scenarios = Utils.pushAll([], this.dataService.getScenarioByCreator(integr.login));
          });
        }
        break;
      default:
        this.scenarios.slice(0, this.scenarios.length);
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

  public addNewScenario() {
    this.router.navigate(['main/scenario/scenario-create'], {
      queryParams: {}
    });
  }

  public createReportOnScenarios() {
    alert('Блок отчетности по сценариям недоступен');
  }

  public updateScenarioList() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public editScenario(id: number) {
    if (Utils.exists(this.dataService.getScenario(id))) {
      this.router.navigate(['main/scenario/scenario-edit', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим редактировать не существующий сценарий');
    }
  }
  public viewScenario(id: number) {
    if (Utils.exists(this.dataService.getScenario(id))) {
      this.router.navigate(['main/scenario/scenario-view', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующий сценарий');
    }
  }

  public doubleScenario(id: number) {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.dataService.duplicateScenario(id, this.$user.getValue().user_login);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public removeScenario(id: number) {
    this.isCompleted$.next(false);
    this.dataService.deleteScenario(id);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public isActivated(id: number) {
    return false;
  }

  public scenarioOnOff(id: number) {
    console.log('Тык');
  }

  public compareScenario(id: number) {
    alert('Модуль сопоставления сценария недоступен');
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.scenarios.length !== 0;
  }

  // public ngOnInit() {
  //   this.subscriptions.push(
  //     this.activatedRoute.queryParams.subscribe(res => this.setQueryParams(res))
  //   );
  // }

  // private setQueryParams(params: Params) {
  //
  //   this.destId = this.roleDest(params);
  //   if (Utils.exists(params['period'])) {
  //     this.period = Utils.idToDate(+params['period']);
  //   }
  //   this.loaded$.next(true);
  // }
}
