import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {UserGroup} from '../../../../models/user-group';

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
  private noGroup: UserGroup = new UserGroup(0, 'Нет родителя', '');

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
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
    this.simpleLogin = this.activatedRoute.params['_value']['login'];
    const integrator = this.dataService.getUser(this.simpleLogin);
    this.login = integrator.login;
    this.name = integrator.name;
    this.info = integrator.info;
    this.updateList();
    this.selectedGroup = integrator.group !== -1 ? this.dataService.getUserGroup(integrator.group).name : this.noGroup.name;
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public updateList() {
    this.groups.splice(0, this.groups.length);
    if (this.role() === Roles.ADMIN || this.role() === Roles.MAIN_ADMIN) {
      this.groups.push(this.noGroup);
      const allGroups = this.dataService.getUserGroups();
      if (allGroups.length !== 0) {
        allGroups.forEach(gr => this.groups.push(gr));
      }
    }
    if (this.role() === Roles.INTEGRATOR) {
      this.groups.push(this.noGroup);
      const user = this.dataService.getIntegrator(this.$user.getValue().user_login);
      const children = this.dataService.getAllChildrenUserGroup(user.group);
      if (children.length !== 0) {
        children.forEach(ch => this.groups.push(ch))
      }
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
    const simple = this.dataService.getUser(this.simpleLogin);
    this.dataService.updateUser(simple.login, this.$login, simple.password, this.$name, this.$info, this.$group.id);
    this.router.navigate(['main/user/user-list'], {
      queryParams: {}
    });
  }

  public enabledToSave() {
    return Utils.exists(this.$login)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info);
  }
}
