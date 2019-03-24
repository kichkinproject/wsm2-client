import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Role, Roles } from "../../../../models/role";
import { select, Store } from "@ngrx/store";
import { GetCurrentUser, State } from "../../../../_state";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data-service";
import { Controller } from "../../../../models/controller";
import { Utils } from "../../../../utils/utils";
import { Thing } from "../../../../models/thing";

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
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.thingId = +this.activatedRoute.params['_value']['id'];
    this.thing = this.dataService.getThing(this.thingId);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    switch (role) {
      case Roles.INTEGRATOR:
        this.controllers = Utils.pushAll([], this.dataService.getControllersByGroup(user.group));
        break;
      default:
        this.controllers.slice(0, this.controllers.length);
        break;
    }
  }

  public createLinkThing(id) {
    this.isCompleted$.next(false);
    this.dataService.createThingControllerLink(this.thing.id, id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public destroyLinkThing() {
    this.isCompleted$.next(false);
    this.dataService.destroyThingControllerLink(this.thing.id);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
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
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }
}
