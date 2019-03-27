import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {User} from '../../../../models/user';
import {Utils} from '../../../../utils/utils';
import {WsmDataService} from '../../../../services/wsm-data.service';

@Component({
  selector: 'wsm-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
              public serviceData: WsmDataService,
              public dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }



  private updateCollection() {
    const role = this.$user.getValue().user_role;
    this.admins = [];
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.admins = this.serviceData.getAdmins();
        break;
      default:
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

  public addNewAdmin() {
    this.router.navigate(['main/admin/admin-create'], {
      queryParams: {}
    });
  }

  public createReportOnAdmins() {
    alert('Блок отчетности по администраторам недоступен');
  }

  public updateAdminList() {
    this.isCompleted$.next(false);
    this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public editAdmin(login: string) {
    this.serviceData.getAdmin(login)
      .then((response) => {
        if (Utils.exists(response)) {
          const admin = new User(
            response.login,
            '',
            response.fio,
            '',
            Roles.ADMIN,
            -1
          );
          this.router.navigate(['main/admin/admin-edit', login], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим редактировать не существующего администратора');
        }
      });
  }

  public viewAdmin(login: string) {
    this.serviceData.getAdmin(login)
      .then((response) => {
        if (Utils.exists(response)) {
          const admin = new User(
            response.login,
            '',
            response.fio,
            '',
            Roles.ADMIN,
            -1
          );
          this.router.navigate(['main/admin/admin-view', login], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим просмотреть не существующего администратора');
        }
      });
  }

  public removeAdmin(login: string) {
    if (confirm(`Вы уверены, что хотите удалить администратора ${login}?`)) {
      this.isCompleted$.next(false);
      this.cd.detectChanges();
      this.serviceData.deleteAdmin(login)
        .then((response) => {
          this.updateCollection();
          this.isCompleted$.next(true);
          this.cd.detectChanges();
        });
    }
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
