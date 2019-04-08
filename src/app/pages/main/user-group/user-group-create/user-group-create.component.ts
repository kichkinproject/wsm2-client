import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { GetCurrentUser, State } from "../../../../_state";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";
import { UserGroup } from "../../../../models/user-group";
import { WsmDataService } from "../../../../services/wsm-data.service";

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
              public serviceData: WsmDataService,
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
    // this.selectedGroup = this.groups[0].name;
    // this.defaultSelect();

    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public updateList() {
    // return this.serviceData.
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
          return response;
        })
        .then((response) => {
          if (Utils.missing(this.selectedGroup)) {
            this.selectedGroup = this.groups[0].name;
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
        return response;
      })
        .then((response) => {
          if (Utils.missing(this.selectedGroup)) {
            this.selectedGroup = this.groups[0].name;
          }
        });
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
    if (this.role() === Roles.INTEGRATOR) {
      return Utils.exists(this.$group) ? this.$group.name : null;
    } else {
      return Utils.exists(this.$group) ? this.$group.name : this.noGroup.name;
    }
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
    this.isCompleted$.next(false);
    this.serviceData.addUserGroup(this.$name, this.$description, this.$group.id !== 0 ? this.$group.id : null)
      .then((response) => {
        this.router.navigate(['main/user-group/user-group-list'], {
          queryParams: {}
        });
        this.isCompleted$.next(true);
        this.cd.detectChanges();
      });
  }

  public enabledToAdd() {
      return Utils.exists(this.$name)
      && Utils.exists(this.$description);
  }
}
