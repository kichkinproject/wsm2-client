import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Role, Roles } from "../../../../models/role";
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../../../_state";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { Utils } from "../../../../utils/utils";
import { Controller } from "../../../../models/controller";
import { Sensor } from "../../../../models/sensor";

@Component({
  selector: 'wsm-controller-sensor-link',
  templateUrl: './controller-sensor-link.component.html',
  styleUrls: ['./controller-sensor-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControllerSensorLinkComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private sensors: Array<Sensor> = [];
  private controllerId: number;
  private controller: Controller;
  private baseRole = Roles;

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
    this.controller = this.dataService.getController(this.controllerId);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    switch (role) {
      case Roles.INTEGRATOR:
        this.sensors = Utils.pushAll([], this.dataService.getSensorsByGroup(user.group));
        break;
      default:
        this.sensors.slice(0, this.sensors.length);
        break;
    }
  }

  public createLinkSensor(id) {
    this.isCompleted$.next(false);
    this.dataService.createSensorControllerLink(id, this.controller.id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public destroyLinkSensor(id) {
    this.isCompleted$.next(false);
    this.dataService.destroySensorControllerLink(id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.sensors.length !== 0;
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public updateSensorList() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }
}
