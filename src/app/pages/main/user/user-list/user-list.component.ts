import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {User} from '../../../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'wsm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private users: Array<User> = [];
  private baseRole = Roles;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
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
        this.users = Utils.pushAll([], this.dataService.getUsers());
        break;
      case Roles.INTEGRATOR:
        this.users = Utils.pushAll([], this.dataService.getUsersByChildrenGroup(user.group));
        break;
      case Roles.SIMPLE:
        this.users = Utils.pushAll([], this.dataService.getUsersByGroup(user.group));
        break;
      default:
        this.users.slice(0, this.users.length);
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

  public addNewUser() {
    this.router.navigate(['main/user/user-create'], {
      queryParams: {}
    });
  }

  public createReportOnUsers() {
    alert('Блок отчетности по пользователям недоступен');
  }

  public updateUserList() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public editUser(login: string) {
    if (Utils.exists(this.dataService.getUser(login))) {
      this.router.navigate(['main/user/user-edit', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим редактировать не существующего пользователя');
    }
  }
  public viewUser(login: string) {
    if (Utils.exists(this.dataService.getUser(login))) {
      this.router.navigate(['main/user/user-view', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующего пользователя');
    }
  }

  public removeUser(login: string) {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.dataService.deleteUser(login);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.SIMPLE && role !== Roles.NONE;
  }

  public anyShown() {
    return this.users.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

}
