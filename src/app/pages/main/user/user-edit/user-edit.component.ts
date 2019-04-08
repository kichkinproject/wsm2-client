import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';
import {WsmDataService} from '../../../../services/wsm-data.service';

@Component({
  selector: 'wsm-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserEditComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $login: string;
  private $name: string;
  private $info: string;
  private $group: UserGroup;
  private groups: Array<UserGroup> = [];
  private noGroup: UserGroup = new UserGroup(0, 'Нет группы', '');

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

  private simpleLogin: string;

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateList();
    this.simpleLogin = this.activatedRoute.params['_value']['login'];
    this.serviceData.getUser(this.simpleLogin)
      .then((response) => {
        this.login = response.login;
        this.name = response.fio;
        this.info = response.info;
        if (response.userGroup === null) {
          this.selectedGroup = 'Нет группы';
        } else {
          this.serviceData.getUserGroup(response.userGroup.id)
            .then((response1) => {
              this.selectedGroup = response1.name;
            });
        }
        this.isCompleted$.next(true);
        this.cd.detectChanges();
      });
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public updateList() {
    this.groups.splice(0, this.groups.length);
    if (this.role() === Roles.ADMIN || this.role() === Roles.MAIN_ADMIN) {
      this.groups.push(this.noGroup);
      this.serviceData.getUserGroups2()
        .then(response => {
          return response.json();
        })
        .then((response) => {
          if (response.length !== 0) {
            response.forEach(res => {
              this.groups.push(new UserGroup(
                res.id,
                res.name,
                res.description,
                Utils.exists(res.parentGroupId) ? res.parentGroupId : -1
              ));
            });
          }
        });
    }
    if (this.role() === Roles.INTEGRATOR) {
      // this.groups.push(this.noGroup);
      this.serviceData.getAllChildrenUserGroup2()
        .then((response) => {
          return response.json();
        }).then((response) => {
        if (response.length !== 0) {
          response.forEach(res => {
            this.groups.push(new UserGroup(
              res.id,
              res.name,
              res.description,
              Utils.exists(res.parentGroupId) ? res.parentGroupId : -1
            ));
          });
        }
      });
    }
  }

  public get selectedGroup() {
    return Utils.exists(this.$group) ? this.$group.name : this.noGroup.name;
  }

  public set selectedGroup(str: string) {
    this.groups.forEach((gr) => {
      if (gr.name === str) {
        this.$group = gr;
        return;
      }
    });
    // this.$type
  }

  public accessed() {
    const role = this.role();
    return role === Roles.ADMIN || role === Roles.INTEGRATOR;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get login() {
    return this.$login;
  }

  public set login(str: string) {
    if (Utils.exists(str)) {
      this.$login = str;
    }
  }

  public get name() {
    return this.$name;
  }

  public set name(str: string) {
    if (Utils.exists(str)) {
      this.$name = str;
    }
  }

  public get info() {
    return this.$info;
  }

  public set info(str: string) {
    if (Utils.exists(str)) {
      this.$info = str;
    }
  }

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkInfo() {
    return Utils.exists(this.$info);
  }

  public saveUser() {
    switch(this.role()) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.serviceData.getUser(this.$login)
          .then((response) => {
            this.isCompleted$.next(false);
            this.serviceData.updateUserByAdmin(this.$login, this.$name, this.$info, (this.$group.id !== 0 || this.$group.id !== -1)  ? this.$group.id : -1)
              .then((response1) => {
                if (!response1.ok) {
                  alert('Изменить пользователя не получилось.');
                } else {
                  this.router.navigate(['main/integrator/integrator-list'], {
                    queryParams: {}
                  });
                }
                this.isCompleted$.next(true);
                this.cd.detectChanges();
              });
          });
        break;
      case Roles.INTEGRATOR:
        this.serviceData.getUser(this.$login)
          .then((response) => {
            this.isCompleted$.next(false);
            this.serviceData.updateUser(this.$login, this.$name, this.$info, (this.$group.id !== 0 || this.$group.id !== -1)  ? this.$group.id : -1)
              .then((response1) => {
                if (!response1.ok) {
                  alert('Изменить пользователя не получилось.');
                } else {
                  this.router.navigate(['main/integrator/integrator-list'], {
                    queryParams: {}
                  });
                }
                this.isCompleted$.next(true);
                this.cd.detectChanges();
              });
          });
        break;
      default:
        alert('Вы не можете изменять интеграторов');
        break;
    }
  }

  public enabledToSave() {
    return Utils.exists(this.$login)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info);
  }
}
