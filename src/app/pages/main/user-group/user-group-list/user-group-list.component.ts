import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { GetCurrentUser, State } from "../../../../_state";
import { User } from "../../../../models/user";
import {UserGroup} from "../../../../models/user-group";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";
import { WsmDataService } from "../../../../services/wsm-data.service";

@Component({
  selector: 'wsm-user-group-list',
  templateUrl: './user-group-list.component.html',
  styleUrls: ['./user-group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
              public serviceData: WsmDataService,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
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
        this.groups = this.serviceData.getUserGroups();
        break;
      case Roles.INTEGRATOR:
        this.groups = this.serviceData.getAllChildrenUserGroup(user.group);
        break;
      case Roles.SIMPLE:
        this.groups.slice(0, this.groups.length);
        break;
    }
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

  public addNewUserGroup() {
    this.router.navigate(['main/user-group/user-group-create'], {
      queryParams: {}
    });
  }

  public createReportOnUserGroups() {
    alert('Блок отчетности по группам пользователям недоступен');
  }

  public updateUserGroupList() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public editUserGroup(id: number) {
    this.serviceData.getUserGroup(id)
      .then((response) => {
        if (Utils.exists(response)) {
          const group = new UserGroup(
            response.id,
            response.name,
            response.description,
            response.parentGroupId,
          );
          this.router.navigate(['main/user-group/user-group-edit', id], {
            queryParams: {}
          });
        } else {
          alert('Ошибка, хотим редактировать не существующую группу пользователей');
        }
      });
  }

  public viewUserGroup(id: number) {
    this.serviceData.getUserGroup(id)
      .then((response) => {
        if (Utils.exists(response)) {
          const group = new UserGroup(
            response.id,
            response.name,
            response.description,
            response.parentGroupId,
          );
          this.router.navigate(['main/user-group/user-group-view', id], {
            queryParams: {}
          });
        } else {
          alert('Ошибка, хотим просмотреть не существующую группу пользователей');
        }
      });
  }

  public removeUserGroup(id: number) {
    if (confirm(`Вы уверены, что хотите удалить данную группу пользователей?`)) {
      this.isCompleted$.next(false);
      this.cd.detectChanges();
      this.serviceData.deleteUserGroup(id)
        .then((response) => {
          this.updateCollection();
          this.isCompleted$.next(true);
          this.cd.detectChanges();
        });
    }
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
