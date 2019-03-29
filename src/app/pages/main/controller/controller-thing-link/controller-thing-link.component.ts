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
import {WsmDataService} from '../../../../services/wsm-data.service';

@Component({
  selector: 'wsm-controller-thing-link',
  templateUrl: './controller-thing-link.component.html',
  styleUrls: ['./controller-thing-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControllerThingLinkComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private things: Array<Thing> = [];
  private controllerId: number;
  private controller: Controller;
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
    this.controllerId = +this.activatedRoute.params['_value']['id'];
    this.serviceData.getController(this.controllerId).then((response) => {
      this.controller = new Controller(
        response.id,
        response.name,
        response.description,
        response.type,
        response.userGroupId
      );
      this.updateCollection();
    });
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    switch (role) {
      case Roles.INTEGRATOR:
        this.isCompleted$.next(false);
        this.things = [];
        this.serviceData.getIntegrator(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getThingsByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    this.things.push(new Thing(response1.id,
                      response1.name,
                      response1.description,
                      response1.type,
                      response1.userGroupId,
                      response1.controllerId));
                  }
                });
            }
            this.isCompleted$.next(true);
            this.cd.detectChanges();
          });
        break;
      default:
        this.things.slice(0, this.things.length);
        break;
    }
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public createLinkThing(id) {
    this.isCompleted$.next(false);
    this.serviceData.createThingControllerLink(id, this.controller.id)
      .then((response) => {
        this.updateCollection();
      }).then((response) => {
      this.isCompleted$.next(true);
      this.cd.detectChanges();
    });
  }

  public destroyLinkThing(id) {
    this.isCompleted$.next(false);
    this.serviceData.destroyThingControllerLink(id)
      .then((response) => {
        this.updateCollection();
      }).then((response) => {
      this.isCompleted$.next(true);
      this.cd.detectChanges();
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

  public updateThingList() {
    this.updateCollection();
  }
}
