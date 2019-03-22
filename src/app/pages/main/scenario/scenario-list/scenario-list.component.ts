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
import { ScenarioController } from "../../../../models/scenario-controller";

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
  private controllerHidden: Map<number, boolean> = new Map<number, boolean>();
  private controllerScenarios: Map<number, Array<Scenario>> = new Map<number, Array<Scenario>>();
  private $publicity: boolean = true;

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
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        // this.scenarios = [];
        // this.dataService.getScenarios().forEach((scen) => this.scenarios.push(scen));
        // break;
      case Roles.INTEGRATOR:
        if (this.publicity) {
          this.onlyPublic();
        } else {
          this.onlyPrivate();
        }
        break;
      case Roles.SIMPLE:
        this.controllers = Utils.pushAll([], this.dataService.getControllersByGroup(user.group));
        this.controllerHidden.clear();
        this.controllerScenarios.clear();
        this.controllers.forEach((cnt) => {
          this.controllerHidden.set(cnt.id, true);
          const scenarioControllers = this.dataService.getScenarioControllersByController(cnt.id);
          const scens: Array<Scenario> = [];
          if (Utils.exists(scenarioControllers) && scenarioControllers.length !== 0) {
            scenarioControllers.forEach(sC => {
              const scenario = this.dataService.getScenario(sC.scenarioId);
              if (Utils.exists(scenario)) {
                scens.push(scenario);
              }
            });
          }
          this.controllerScenarios.set(cnt.id, scens);
        });
        // integrators = Utils.pushAll([], this.dataService.getIntegratorsByGroup(user.group));
        // if (integrators.length !== 0) {
        //   integrators.forEach((integr) => {
        //     this.scenarios = Utils.pushAll([], this.dataService.getScenarioByCreator(integr.login));
        //   });
        // }
        break;
      default:
        this.scenarios.slice(0, this.scenarios.length);
        break;
    }
  }

  public get publicity() {
    return this.$publicity;
  }

  public set publicity(value: boolean) {
    this.$publicity = value;
  }

  public onlyPrivate() {
    this.publicity = false;
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    switch (role) {
      case Roles.MAIN_ADMIN:
        this.scenarios = this.dataService.getPrivateScenarios();
        break;
      case Roles.ADMIN:
        this.scenarios = this.dataService.getScenarioByCreator(user.login);
        break;
      case Roles.INTEGRATOR:
        this.scenarios = [];
        let integrators: Array<User> = [];
        integrators = Utils.pushAll([], this.dataService.getIntegratorsByChildrenGroup(user.group));
        if (integrators.length !== 0) {
          integrators.forEach((integr) => {
            const integrScens = this.dataService.getScenarioByCreator(integr.login);
            integrScens.forEach(sc => this.scenarios.push(sc));
          });
        }
        break;
    }
  }

  public updoadNewScenario() {
    alert('Блок загрузки сценария в систему пока не доступен');
  }

  public publishScenario(id: number) {
    const scen = this.dataService.getScenario(id);
    scen.publicity = true;
    this.updateCollection();
  }

  public unpublishScenario(id: number) {
    const scen = this.dataService.getScenario(id);
    scen.publicity = false;
    this.updateCollection();
  }

  public onlyPublic() {
    this.publicity = true;
    this.scenarios = this.dataService.getPublicScenarios();
  }

  public activated(controller: number, scenario: number) {
    const contScen: ScenarioController = this.dataService.getScenarioControllersByController(controller).find(sC => sC.scenarioId === scenario);
    return contScen.activated;
  }

  public turnScenario(controller: number, scenario: number, value: boolean) {
    const contScen: ScenarioController = this.dataService.getScenarioControllersByController(controller).find(sC => sC.scenarioId === scenario);
    contScen.activated = value;
  }

  public controllerScens(id: number) {
    return this.controllerScenarios.get(id);
  }

  public hidden(id: number) {
    return this.controllerHidden.get(id);
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
    alert('Блок создания сценария временно не доступен');
    // this.router.navigate(['main/scenario/scenario-create'], {
    //   queryParams: {}
    // });
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
    alert('Блок редактирования сценария временно не доступен');
    // if (Utils.exists(this.dataService.getScenario(id))) {
    //   this.router.navigate(['main/scenario/scenario-edit', id.toString()], {
    //     queryParams: {}
    //   });
    // } else {
    //   console.log('Ошибка, хотим редактировать не существующий сценарий');
    // }
  }
  public viewScenario(id: number) {
    alert('Блок просмотра сценария временно не доступен');
    // if (Utils.exists(this.dataService.getScenario(id))) {
    //   this.router.navigate(['main/scenario/scenario-view', id.toString()], {
    //     queryParams: {}
    //   });
    // } else {
    //   console.log('Ошибка, хотим просмотреть не существующий сценарий');
    // }
  }

  public shareControllersScenario(id: number) {
    return this.controllerHidden.set(id, false);
  }

  public hideControllersScenario(id: number) {
    return this.controllerHidden.set(id, true);
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
    alert('Блок загрузки сценария в контроллер недоступен');
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
