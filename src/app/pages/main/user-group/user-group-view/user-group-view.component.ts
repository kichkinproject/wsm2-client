import { AfterViewInit, Component } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Wsm2DataService } from "../../../../services/wsm2-data-service";
import { GetCurrentUser, State } from "../../../../_state";
import { SensorType } from "../../../../models/entity-type";
import { UserGroup } from "../../../../models/user-group";
import { Role } from "../../../../models/role";
import { Utils } from "../../../../utils/utils";
import { select, Store } from "@ngrx/store";

@Component({
  selector: 'wsm-user-group-view',
  templateUrl: './user-group-view.component.html',
  styleUrls: ['./user-group-view.component.scss']
})
export class UserGroupViewComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $name: string;
  private $description: string;
  private $group: string;
  private noGroup: UserGroup = new UserGroup(0, 'Нет родителя', '');

  private groupId: number;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.groupId = this.activatedRoute.params['id'];
    const userGroup = this.dataService.getUserGroup(this.groupId);
    this.name = userGroup.name;
    this.description = userGroup.description;
    this.parentGroup = userGroup.parentId !== -1 ? this.dataService.getUserGroup(userGroup.parentId).name : this.noGroup.name;
    this.isCompleted$.next(true);
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

  public get parentGroup() {
    return this.$group;
  }

  public set parentGroup(str: string) {
    if (Utils.exists(str)) {
      this.$group = str;
    }
  }
}


