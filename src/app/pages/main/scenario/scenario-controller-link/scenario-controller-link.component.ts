import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Role, Roles } from "../../../../models/role";
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../../../_state";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data-service";
import { Controller } from "../../../../models/controller";
import { Utils } from "../../../../utils/utils";
import {Scenario} from '../../../../models/scenario';
import {ScenarioController} from '../../../../models/scenario-controller';

@Component({
  selector: 'wsm-scenario-controller-link',
  templateUrl: './scenario-controller-link.component.html',
  styleUrls: ['./scenario-controller-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ScenarioControllerLinkComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $controller: Controller;
  private controllers: Array<Controller> = [];
  private scenarios: Array<Scenario> = [];
  private baseRole = Roles;
  private controllerScenarios: Map<number, Array<Scenario>> = new Map<number, Array<Scenario>>();
  private $publicity: boolean = true;

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
    this.updateList();
    // this.cd.detectChanges();
    // this.sensorId = +this.activatedRoute.params['_value']['id'];
    // this.sensor = this.dataService.getSensor(this.sensorId);
    if (this.controllers.length !== 0) {
      this.selectedController = this.controllers[0].name;
    }
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get selectedContr() {
    return Utils.exists(this.$controller) ? this.$controller : null;
  }

  public get selectedController() {
    return Utils.exists(this.$controller) ? this.$controller.name : 'Контроллер не выбран';
  }

  public set selectedController(str: string) {
    this.controllers.forEach((cnt) => {
      if (cnt.name === str) {
        this.$controller = cnt;
      }
    });
    if (this.publicity) {
      this.updatePublicScenContr();
    } else {
      this.updatePrivateScenContr();
    }
    // this.updateCollection();
  }

  public updateList() {
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    this.controllers = Utils.pushAll([], this.dataService.getControllersByGroup(user.group));
  }

  public updateCollection() {
    const role = this.$user.getValue().user_role;
    switch (role) {
      case this.baseRole.INTEGRATOR:
        if (this.publicity) {
          this.onlyPublic();
        } else {
          this.onlyPrivate();
        }
        break;
      default:
        this.scenarios = [];
        break;
    }
  }

  public loaded(controller: number, scenario: number) {
    const loadedScens = this.controllerScenarios.get(controller);
    if (loadedScens.length !== 0) {
      return loadedScens.filter((sC) => sC.id === scenario).length !== 0;
    } else {
      return false;
    }
  }

  private updatePublicScenContr() {
    this.controllers.forEach((cnt) => {
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
  }

  private updatePrivateScenContr() {
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    this.controllers.forEach((cnt) => {
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
  }

  public destroyScenarioLink(controller: number, scenario: number) {
    const contScen: ScenarioController = this.dataService.getScenarioControllersByController(controller).find(sC => sC.scenarioId === scenario);
    this.dataService.deleteScenarioController(contScen.id);
    this.updateCollection();
  }

  public createScenarioLink(controller: number, scenario: number) {
    const contScen: ScenarioController = this.dataService.addScenarioController(scenario, controller, false);
    this.updateCollection();
  }


  public get publicity() {
    return this.$publicity;
  }

  public set publicity(value: boolean) {
    this.$publicity = value;
  }

  public onlyPublic() {
    this.publicity = true;
    this.scenarios = Utils.pushAll([], this.dataService.getPublicScenarios());
    this.updatePublicScenContr();
  }

  public onlyPrivate() {
    this.publicity = false;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    this.scenarios = Utils.pushAll([], this.dataService.getScenarioByCreator(user.login));
    this.updatePrivateScenContr();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public role() {
    return this.$user.getValue().user_role;
  }
}
