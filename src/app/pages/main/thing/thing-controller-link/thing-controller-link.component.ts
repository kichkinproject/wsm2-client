import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Role, Roles } from "../../../../models/role";
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../../../_state";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { Controller } from "../../../../models/controller";
import { Utils } from "../../../../utils/utils";
import { Thing } from "../../../../models/thing";
import { WsmDataService } from "../../../../services/wsm-data.service";
import { Sensor } from "../../../../models/sensor";

@Component({
  selector: 'wsm-thing-controller-link',
  templateUrl: './thing-controller-link.component.html',
  styleUrls: ['./thing-controller-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ThingControllerLinkComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private controllers: Array<Controller> = [];
  private thingId: number;
  private thing: Thing;
  private baseRole = Roles;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private serviceData: WsmDataService,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    // this.cd.detectChanges();
    this.thingId = +this.activatedRoute.params['_value']['id'];
    this.serviceData.getThing(this.thingId)
      .then((response) => {
      this.thing = new Thing(
        response.id,
        response.name,
        response.description,
        response.type,
        response.userGroupId,
        response.controllerId
      );
    })
      .then((response) => {
        this.updateCollection();
      });
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    switch (role) {
      case Roles.INTEGRATOR:
        this.isCompleted$.next(false);
        this.controllers = [];
        this.serviceData.getIntegrator(this.$user.getValue().user_login)
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
                  this.isCompleted$.next(true);
                  this.cd.detectChanges();
                });
            }
          });
        break;
      default:
        this.isCompleted$.next(false);
        this.controllers.slice(0, this.controllers.length);
        this.isCompleted$.next(true);
        this.cd.detectChanges();
        break;
    }
  }

  public createLinkThing(id) {
    this.serviceData.createThingControllerLink(this.thing.id, id)
      .then((response) => {
        this.updateCollection();
      });
  }

  public destroyLinkThing() {
    this.serviceData.destroyThingControllerLink(this.thing.id)
      .then((response) => {
        this.updateCollection();
      });
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.controllers.length !== 0;
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public updateControllersList() {
    this.updateCollection();
  }
}
