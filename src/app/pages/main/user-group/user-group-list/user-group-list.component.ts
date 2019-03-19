import { AfterViewInit, Component } from "@angular/core";
import { Role, Roles } from "../../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data-service";
import { GetCurrentUser, State } from "../../../../_state";
import { User } from "../../../../models/user";
import {UserGroup} from "../../../../models/user-group";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";

@Component({
  selector: 'wsm-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss']
})
export class UserGroupListComponent  implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private groups: Array<UserGroup> = [];
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
        this.groups = Utils.pushAll([], this.dataService.getUserGroups());
        break;
      case Roles.INTEGRATOR:
        this.groups = Utils.pushAll([], this.dataService.getAllChildrenUserGroup(user.group));
        break;
      case Roles.SIMPLE:
        this.groups.slice(0, this.groups.length);
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

  public addNewUserGroup() {
    this.router.navigate(['/user-group-create'], {
      queryParams: {}
    });
  }

  public createReportOnUserGroups() {
    console.log('Блок отчетности по группам пользователям недоступен');
  }

  public updateUserGroupList() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public editUserGroup(id: number) {
    if (Utils.exists(this.dataService.getUserGroup(id))) {
      this.router.navigate(['/user-group-edit', id], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим редактировать не существующую группу пользователей');
    }
  }
  public viewUserGroup(id: number) {
    if (Utils.exists(this.dataService.getUserGroup(id))) {
      this.router.navigate(['/user-group-view', id], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующую группу пользователей');
    }
  }

  public removeUserGroup(id: number) {
    this.isCompleted$.next(false);
    this.dataService.deleteUserGroup(id);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.SIMPLE && role !== Roles.NONE;
  }

  public anyShown() {
    return this.groups.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

}
