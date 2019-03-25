import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { GetCurrentUser, State } from "../../../../_state";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";
import { UserGroup } from "../../../../models/user-group";

@Component({
  selector: 'wsm-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserGroupCreateComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
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

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateList();
    this.selectedGroup = this.groups[0].name;
    // this.defaultSelect();

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

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public get name() {
    return this.$name;
  }

  public set name(str: string) {
    if (Utils.exists(str)) {
      this.$name = str;
    }
  }

  public get description() {
    return this.$description;
  }

  public set description(str: string) {
    if (Utils.exists(str)) {
      this.$description = str;
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
    return role !== Roles.SIMPLE && role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkDesc() {
    return Utils.exists(this.$description);
  }

  public createUserGroup() {
    this.dataService.addUserGroup(this.$name, this.$description, this.$group.id);
    this.router.navigate(['main/user-group/user-group-list'], {
      queryParams: {}
    });
  }

  public enabledToAdd() {
      return Utils.exists(this.$name)
      && Utils.exists(this.$description);
  }
}
