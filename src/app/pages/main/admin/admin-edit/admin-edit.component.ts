import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ScenarioType} from '../../../../models/entity-type';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import { WsmDataService } from "../../../../services/wsm-data.service";

@Component({
  selector: 'wsm-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AdminEditComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $password: string;
  private subscriptions: Array<Subscription> = [];
  private $login: string;
  private $name: string;
  private $info: string;

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

  private adminLogin: string;

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.adminLogin = this.activatedRoute.params['_value']['login'];
    this.serviceData.getAdmin(this.adminLogin)
      .then((response) => {
        this.login = response.login;
        this.name = response.fio;
        this.info = response.info;
        this.isCompleted$.next(true);
        this.cd.detectChanges();
      });
  }

  public accessed() {
    const role = this.role();
    return role === Roles.MAIN_ADMIN;
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

  public get password() {
    return this.$password;
  }

  public set password(str: string) {
    if (Utils.exists(str)) {
      this.$password = str;
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

  public saveAdmin() {
    this.serviceData.getAdmin(this.$login)
      .then((response) => {
        this.isCompleted$.next(false);
        this.serviceData.updateAdmin(this.$login, this.$password, this.$name, this.$info)
          .then((response1) => {
            if (!response1.ok) {
              alert('Изменить аминистратора не получилось. Неверный пароль. Введите правильный пароль администратора.');
            } else {
              this.router.navigate(['main/admin/admin-list'], {
                queryParams: {}
              });
            }
            this.isCompleted$.next(true);
            this.cd.detectChanges();
          });
      });
  }

  public enabledToSave() {
    return Utils.exists(this.$login)
      && Utils.exists(this.$password)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info);
  }

}
