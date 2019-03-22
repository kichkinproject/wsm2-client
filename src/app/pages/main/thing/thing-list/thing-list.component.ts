import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {Scenario} from '../../../../models/scenario';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';
import {Thing} from '../../../../models/thing';
import { Controller } from "../../../../models/controller";

@Component({
  selector: 'wsm-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ThingListComponent  implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private things: Array<Thing> = [];
  private baseRole = Roles;
  private controllers: Array<Controller> = [];
  private controllerHidden: Map<number, boolean> = new Map<number, boolean>();
  private controllerThings: Map<number, Array<Thing>> = new Map<number, Array<Thing>>();


  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  public hidden(id: number) {
    return this.controllerHidden.get(id);
  }

  public controllerTh(id: number) {
    return this.controllerThings.get(id);
  }

  public shareControllersThings(id: number) {
    return this.controllerHidden.set(id, false);
  }

  public hideControllersThings(id: number) {
    return this.controllerHidden.set(id, true);
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.things.slice(0, this.things.length);
        break;
      case Roles.INTEGRATOR:
        this.things = Utils.pushAll([], this.dataService.getThingsByGroup(user.group));
        break;
      case Roles.SIMPLE:
        this.controllers = Utils.pushAll([], this.dataService.getControllersByGroup(user.group));
        this.controllerHidden.clear();
        this.controllerThings.clear();
        this.controllers.forEach((cnt) => {
          this.controllerHidden.set(cnt.id, true);
          const contrThings = this.dataService.getThingsByController(cnt.id);
          this.controllerThings.set(cnt.id, contrThings);
        });
        break;
      default:
        this.things.slice(0, this.things.length);
        break;
    }
  }

  public createLinkController(id) {
    if (Utils.exists(this.dataService.getThing(id))) {
      this.router.navigate(['main/thing/thing-controller-link', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующее устройство');
    }
    // alert('Блок настройки связи с контроллером временно не доступен');
    // this.dataService.createSensorControllerLink()
  }

  public destroyLinkController(id) {
    this.isCompleted$.next(false);
    this.dataService.destroyThingControllerLink(id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
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

  public findNewThing() {
    this.router.navigate(['main/thing/thing-find'], {
      queryParams: {}
    });
  }

  public createReportOnThing() {
    alert('Блок отчетности по устройствам недоступен');
  }

  public updateThingsList() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public viewThing(id: number) {
    if (Utils.exists(this.dataService.getThing(id))) {
      this.router.navigate(['main/thing/thing-view', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующее устройство');
    }
  }

  public removeThing(id: number) {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.dataService.deleteThing(id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.things.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }



}
