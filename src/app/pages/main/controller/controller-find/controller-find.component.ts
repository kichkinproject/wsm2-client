import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ControllerType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';
import {Controller} from '../../../../models/controller';
import {User} from '../../../../models/user';

@Component({
  selector: 'wsm-controller-find',
  templateUrl: './controller-find.component.html',
  styleUrls: ['./controller-find.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControllerFindComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $type: ControllerType;
  private $founded: boolean;
  private currentUser: User;
  public scTypes: Map<ControllerType, string> = new Map<ControllerType, string>( [
    [
      ControllerType.CONTROLLER_TYPE_1,
      'Первый тип контроллеров'
    ],
    [
      ControllerType.CONTROLLER_TYPE_2,
      'Второй тип контроллеров'
    ],
    [
      ControllerType.CONTROLLER_TYPE_3,
      'Третий тип контроллеров'
    ],
    [
      ControllerType.CONTROLLER_TYPE_4,
      'Четвертый тип контроллеров'
    ]
  ]);

  private newControllers: Array<Controller> = [
    {
      id: 50,
      name: 'Контроллер 50',
      description: 'Описание контроллера 50',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: -1,
    },
    {
      id: 51,
      name: 'Контроллер 51',
      description: 'Описание контроллера 51',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: -1,
    },
    {
      id: 52,
      name: 'Контроллер 52',
      description: 'Описание контроллера 52',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: -1,
    },
    {
      id: 53,
      name: 'Контроллер 53',
      description: 'Описание контроллера 53',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: -1,
    },
    {
      id: 54,
      name: 'Контроллер 54',
      description: 'Описание контроллера 54',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: -1,
    },
    {
      id: 55,
      name: 'Контроллер 55',
      description: 'Описание контроллера 55',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: -1,
    },
    {
      id: 56,
      name: 'Контроллер 56',
      description: 'Описание контроллера 56',
      type: ControllerType.CONTROLLER_TYPE_1,
      master: -1,
    },
    {
      id: 57,
      name: 'Контроллер 57',
      description: 'Описание контроллера 57',
      type: ControllerType.CONTROLLER_TYPE_2,
      master: -1,
    },
    {
      id: 58,
      name: 'Контроллер 58',
      description: 'Описание контроллера 58',
      type: ControllerType.CONTROLLER_TYPE_3,
      master: -1,
    },
    {
      id: 59,
      name: 'Контроллер 59',
      description: 'Описание контроллера 59',
      type: ControllerType.CONTROLLER_TYPE_4,
      master: -1,
    },
  ];

  private $controllerId: number;

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
      // this.controllerId = +this.activatedRoute.params['_value']['id'];
      // const controller = this.dataService.getController(this.controllerId);
      // this.name = controller.name;
      // this.description = controller.description;
      // this.typeContr = this.scTypes.get(controller.type);
      // this.masterContr = this.dataService.getUserGroup(controller.master);
      this.isCompleted$.next(true);
      this.cd.detectChanges();
    }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get controllerId() {
    return this.$controllerId;
  }

  public set controllerId(id: number) {
    if (Utils.exists(id) && isFinite(+id)) {
      this.$controllerId = +id;
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

  public get typeContr() {
    return this.scTypes.get(this.$type);
  }

  public set typeContr(str: string) {
    if (Utils.exists(str)) {
      let okey: ControllerType = null;
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

  public controllerNotFound() {
    if (Utils.exists(this.$controllerId)) {
      if (this.newControllers.filter(cr => cr.id === this.$controllerId).length !== 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public controllerExisting() {
    if (Utils.exists(this.$controllerId)) {
      const crs = this.dataService.getControllersByGroup(this.currentUser.group).filter(cr => cr.id === this.$controllerId);
      if (crs.length === 0) {
        return false;
      } else {
        return true;
      }
      // if (this.dataService.getControllersByGroup(this.currentUser.group))
    } else {
      return true;
    }
  }

  public get controllerFounded() {
    return this.$founded;
  }

  public set controllerFounded(value: boolean) {
    this.$founded = value;
  }

  public findController() {
    if (!this.controllerNotFound() && !this.controllerExisting()) {
      this.isCompleted$.next(false);
      const controller = this.newControllers.find(ctr => ctr.id === this.$controllerId);
      this.name = controller.name;
      this.description = controller.description;
      this.$type = controller.type;
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

  public addFoundedController() {
    this.isCompleted$.next(false);
    this.dataService.addController(this.$name, this.$description, this.$type, this.currentUser.group);
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
