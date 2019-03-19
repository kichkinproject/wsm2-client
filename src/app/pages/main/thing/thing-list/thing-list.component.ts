import {AfterViewInit, Component} from '@angular/core';
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

@Component({
  selector: 'wsm-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss']
})
export class ThingListComponent  implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private things: Array<Thing> = [];
  private baseRole = Roles;


  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
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
        this.things.slice(0, this.things.length);
        break;
      default:
        this.things.slice(0, this.things.length);
        break;
    }
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public findNewThing() {
    this.router.navigate(['/thing-find'], {
      queryParams: {}
    });
  }

  public createReportOnThing() {
    console.log('Блок отчетности по устройствам недоступен');
  }

  public updateThingsList() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public viewThing(id: number) {
    if (Utils.exists(this.dataService.getThing(id))) {
      this.router.navigate(['/thing-view', id.toString()], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующее устройство');
    }
  }

  public removeThing(id: number) {
    this.isCompleted$.next(false);
    this.dataService.deleteThing(id);
    this.updateCollection();
    this.isCompleted$.next(true);
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
