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

@Component({
  selector: 'wsm-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private admins: Array<User> = [];
  private baseRole = Roles;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              public dataService: Wsm2DataService) {
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
        this.admins = Utils.pushAll([], this.dataService.getAdmins());
        break;
      default:
        this.admins = [];
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

  public addNewAdmin() {
    this.router.navigate(['main/admin/admin-create'], {
      queryParams: {}
    });
  }

  public createReportOnAdmins() {
    console.log('Блок отчетности по администраторам недоступен');
  }

  public updateAdminList() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public editAdmin(login: string) {
    if (Utils.exists(this.dataService.getAdmin(login))) {
      this.router.navigate(['main/admin/admin-edit', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим редактировать не существующего администратора');
    }
  }
  public viewAdmin(login: string) {
    if (Utils.exists(this.dataService.getAdmin(login))) {
      this.router.navigate(['main/admin/admin-view', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующего администратора');
    }
  }

  public removeAdmin(login: string) {
    this.isCompleted$.next(false);
    this.dataService.deleteAdmin(login);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public accessed() {
    const role = this.role();
    return role === Roles.ADMIN || role === Roles.MAIN_ADMIN;
  }

  public anyShown() {
    return this.admins.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

}
