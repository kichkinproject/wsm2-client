import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {Scenario} from '../../../../models/scenario';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';
import {Thing} from '../../../../models/thing';
import { Controller } from "../../../../models/controller";
import { WsmDataService } from "../../../../services/wsm-data.service";

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
              private serviceData: WsmDataService,
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
        this.isCompleted$.next(false);
        this.things = [];
        this.serviceData.getIntegrator(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getThingsByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    response1.forEach(res1 => {
                      this.things.push(new Thing(res1.id,
                        res1.name,
                        res1.description,
                        res1.type,
                        res1.userGroupId,
                        res1.controllerId));
                    });
                  }
                  this.isCompleted$.next(true);
                  this.cd.detectChanges();
                });
            }
          });
        break;
      case Roles.SIMPLE:
        this.isCompleted$.next(false);
        this.controllers = [];
        this.serviceData.getUser(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getControllersByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    response1.forEach(res1 => {
                      this.controllers.push(new Controller(res1.id,
                        res1.name,
                        res1.description,
                        res1.type,
                        res1.userGroupId));
                    });
                  }
                  this.controllerHidden.clear();
                  this.controllerThings.clear();
                  if (this.controllers.length !== 0) {
                    let i = 0;
                    this.controllers.forEach((cnt) => {
                      this.controllerHidden.set(cnt.id, true);
                      this.serviceData.getThingsByController(cnt.id)
                        .then(response2 => {
                          if (response2.length !== 0) {
                            const contrThings: Array<Thing> = new Array<Thing>();
                            response2.forEach(res2 => {
                              contrThings.push(new Thing(res2.id,
                                res2.name,
                                res2.description,
                                res2.type,
                                res2.userGroupId,
                                res2.controllerId));
                            });
                            this.controllerThings.set(cnt.id, contrThings);
                          }
                        });
                      i++;
                      if (i === this.controllers.length) {
                        this.isCompleted$.next(true);
                        this.cd.detectChanges();
                      }
                    });
                  } else {
                    this.isCompleted$.next(true);
                    this.cd.detectChanges();
                  }
                });
            }
          });
        break;
      default:
        this.things.slice(0, this.things.length);
        break;
    }
  }

  public createLinkController(id) {
    this.serviceData.getThing(id)
      .then((response) => {
        this.router.navigate(['main/thing/thing-controller-link', id.toString()], {
          queryParams: {}
        });
      })
      .catch((response) => {
        console.log('Ошибка, хотим настроить связь несуществующему устройству');

      });
    // alert('Блок настройки связи с контроллером временно не доступен');
    // this.dataService.createSensorControllerLink()
  }

  public destroyLinkController(id) {
    this.serviceData.destroyThingControllerLink(id)
      .then((response) => {
        this.updateCollection();
      });
  }

  public ngAfterViewInit() {
    // this.cd.detectChanges();
    this.updateCollection();
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
    // this.cd.detectChanges();
    this.updateCollection();
  }

  public viewThing(id: number) {
    this.serviceData.getThing(id)
      .then((response) => {
        this.router.navigate(['main/thing/thing-view', id.toString()], {
          queryParams: {}
        });
      })
      .catch(error => {
        console.log('Ошибка, хотим просмотреть не существующее устройство');
      });
  }

  public removeThing(id: number) {
    // this.cd.detectChanges();
    this.serviceData.deleteThing(id)
      .then((response) => {
      this.updateCollection();
    });
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
