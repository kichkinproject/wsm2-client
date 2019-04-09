import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {Scenario} from '../../../../models/scenario';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {ScenarioType} from '../../../../models/entity-type';
import {Utils} from '../../../../utils/utils';
import {LoaderModule} from '../../../../components/loader/loader.component';
import {WsmDataService} from '../../../../services/wsm-data.service';
// import { BlocklyComponent } from "../../../../components/blockly/blockly.component";
declare var Blockly: any;

@Component({
  selector: 'wsm-scenario-create',
  templateUrl: './scenario-create.component.html',
  styleUrls: ['./scenario-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ScenarioCreateComponent implements AfterViewInit {
  workspace: any;
  code: any;
  @ViewChild('toolbox') toolbox: ElementRef;

  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $script: string;
  private baseRoles = Roles;
  private $publicity: boolean;
  private $type: ScenarioType = ScenarioType.USER_ACTION;
  public scTypes = [
    {
      id: ScenarioType.USER_ACTION,
      value: 'Выполнение по пользовательскому требованию'
    },
    {
      id: ScenarioType.SENSOR_ACTION,
      value: 'Выполнение при определенных показателях датчика'
    },
    {
      id: ScenarioType.SCHEDULE_ACTION,
      value: 'Выполнение по расписанию'
    },
  ];


  private scenarioId: number;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              private serviceData: WsmDataService,
              public store: Store<State>,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.workspace = Blockly.inject('blocklyDiv',
      {toolbox: this.toolbox.nativeElement});
    this.defaultSelect();
    this.isCompleted$.next(true);
  }

  public convertBlocksToJS() {
    this.code = Blockly.JavaScript.workspaceToCode(this.workspace);
    return this.code;
  }

  public defaultSelect() {
    this.selectedType = 'Выполнение по пользовательскому требованию';
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get name() {
    return this.$name;
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
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
    // if (Utils.exists(str)) {
    //   let okey: ScenarioType = null;
    //   this.scTypes.forEach((value, key) => {
    //     if (value === str) {
    //       okey = key;
    //     }
    //   });
    //   if (Utils.exists(okey)) {
    //     this.$type = okey;
    //   }
    // }
    if (Utils.exists(str)) {
      this.$type = this.scTypes.find(t => t.value === str).id;
    }
  }

  public get selectedType() {
    return this.scTypes.find(t => t.id === this.$type).value;
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

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkDesc() {
    return Utils.exists(this.$description);
  }

  public checkScript() {
    return Utils.exists(this.$script);
    // TODO: Релазизовать проверку скрипта в соответствии с правилами языка
  }

  public createScenario() {
    this.$script = this.convertBlocksToJS();
    alert(this.$script);
    this.isCompleted$.next(false);
    if (this.role() === this.baseRoles.INTEGRATOR) {
      this.serviceData.getIntegrator(this.$user.getValue().user_login)
        .then((response) => {
          if (Utils.missing(response.ok)) {
            this.serviceData.addScenario(this.$name, this.$description, this.$script, this.$type, false, this.$user.getValue().user_login, response.userGroupId)
              .then((response1) => {
                this.router.navigate(['main/scenario/scenario-list'], {
                  queryParams: {}
                });
                this.isCompleted$.next(true);
                this.cd.detectChanges();
              });
          }
        });
    } else {
      this.serviceData.addScenario(this.$name, this.$description, this.$script, this.$type, false, this.$user.getValue().user_login, 1)
        .then((response) => {
          this.router.navigate(['main/scenario/scenario-list'], {
            queryParams: {}
          });
          this.isCompleted$.next(true);
          this.cd.detectChanges();
        });
    }
  }

  public enabledToAdd() {
    return Utils.exists(this.$name)
    && Utils.exists(this.$description)
    && Utils.exists(this.$type);
  }
}
