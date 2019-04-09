import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data.service";
import { GetCurrentUser, State } from "../../../../_state";
import { UserGroup } from "../../../../models/user-group";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";
import {WsmDataService} from '../../../../services/wsm-data.service';

@Component({
  selector: 'wsm-user-group-edit',
  templateUrl: './user-group-edit.component.html',
  styleUrls: ['./user-group-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserGroupEditComponent  implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $group: UserGroup;
  private groupId: number;
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
    this.groupId = +this.activatedRoute.params['_value']['id'];
    this.updateList();
    this.serviceData.getUserGroup(this.groupId)
    //.then((response) => {
    //return response.json();
      .then((response) => {
        if (Utils.missing(response.ok)) {
          // const resp = response.json();
          this.name = response.name;
          this.description = response.description;
          if (response.parentGroupId === null) {
            this.selectedGroup = 'Нет родителя';
          } else {
            this.serviceData.getUserGroup(response.parentGroupId)
              .then((response1) => {
                this.selectedGroup = response1.name;
              });
          }
        }
        this.isCompleted$.next(true);
        this.cd.detectChanges();
      });
    // this.cd.detectChanges();
  }

  public updateList() {
    this.groups.splice(0, this.groups.length);
    if (this.role() === Roles.ADMIN || this.role() === Roles.MAIN_ADMIN) {
      this.groups.push(this.noGroup);
      this.serviceData.getUserGroups2()
        .then((response) => {
          if (response.length !== 0 && response.filter(res => res.id !== this.groupId)) {
            response.filter(res => res.id !== this.groupId).forEach(res => {
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
        if (response.length !== 0 && response.filter(res => res.id !== this.groupId)) {
          response.filter(res => res.id !== this.groupId).forEach(res => {
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

  public saveUserGroup() {
    this.serviceData.getUserGroup(this.groupId)
      .then((response) => {
        this.isCompleted$.next(false);
        this.serviceData.updateUserGroup(this.groupId, this.$name, this.$description, this.$group.id === 0 ? null : this.$group.id)
          .then((response1) => {
            if (!response1.ok) {
              alert('Изменить группу пользователя не получилось. Что-то пошло не так. Ввозможно у вас нет доступа к редактированию этой группы пользователя');
            } else {
              this.router.navigate(['main/user-group/user-group-list'], {
                queryParams: {}
              });
            }
            this.isCompleted$.next(true);
            this.cd.detectChanges();
          });
      });
  }

  public enabledToSave() {
    return Utils.exists(this.$name)
      && Utils.exists(this.$description);
  }
}
