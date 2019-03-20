import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { Role, Roles } from "../../../../models/role";
import {ControllerType, ThingType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {Controller} from '../../../../models/controller';
import {UserGroup} from '../../../../models/user-group';

@Component({
  selector: 'wsm-controller-view',
  templateUrl: './controller-view.component.html',
  styleUrls: ['./controller-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControllerViewComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $type: ControllerType;
  private $master: number;
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

  private controllerId: number;

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
    this.controllerId = +this.activatedRoute.params['_value']['id'];
    const controller = this.dataService.getController(this.controllerId);
    this.name = controller.name;
    this.description = controller.description;
    this.typeContr = this.scTypes.get(controller.type);
    this.masterContr = this.dataService.getUserGroup(controller.master);
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public defaultSelect() {
    this.typeContr = 'Выполнение по расписанию';
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

  public get typeContr() {
    return this.scTypes.get(this.$type);
  }

  public set masterContr(uGr: UserGroup) {
    if (Utils.exists(uGr)) {
      this.$master = uGr.id;

    }
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public get masterContr() {
    return this.dataService.getUserGroup(this.$master);
  }


}
