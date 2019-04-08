import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GetCurrentUser, State } from "../../../_state";
import { select, Store } from "@ngrx/store";
import { Wsm2DataService } from "../../../services/wsm2-data.service";
import { Utils } from "../../../utils/utils";
import { User } from "../../../models/user";
import {WsmDataService} from '../../../services/wsm-data.service';
import {UserGroup} from '../../../models/user-group';

@Component({
  selector: 'wsm-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CabinetComponent implements AfterViewInit {
  private simpleLogin: string;
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $login: string;
  private $old: string;
  private $password: string;
  private $repeat: string;
  private $name: string;
  private $info: string;
  private $group: string;
  private grgr: number;
  private currentUser: User;
  private baseRole = Roles;
  private currentRole = '';

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
    this.simpleLogin = this.activatedRoute.params['_value']['login'];
    switch (this.role()) {
      case this.baseRole.ADMIN:
        this.serviceData.getAdmin(this.simpleLogin)
          .then((response) => {
            this.currentRole = 'администратор';
            this.login = response.login;
            this.name = response.fio;
            this.info = response.info;
            this.isCompleted$.next(true);
            this.cd.detectChanges();
          });
        break;
      case this.baseRole.INTEGRATOR:
        this.serviceData.getIntegrator(this.simpleLogin)
          .then((response) => {
            this.currentRole = 'интегратор';
            this.login = response.login;
            // this.repeatPassword = this.currentUser.password;
            this.name = response.fio;
            this.info = response.info;
            if (Utils.missing(response.userGroupId)) {
              this.group = 'Нет группы';
            } else {
              this.serviceData.getUserGroup(response.userGroupId)
                .then((response1) => {
                  this.group = response1.name;
                  this.grgr = response1.id;
                  this.isCompleted$.next(true);
                  this.cd.detectChanges();
                });
            }
            // this.group = Utils.missing(response.userGroupId) ? 'Нет группы' : response.userGroup.name;
            // this.grgr = response.userGroup;
            // this.isCompleted$.next(true);
            // this.cd.detectChanges();
          });
        break;
      case this.baseRole.SIMPLE:
        this.currentUser = this.dataService.getUser(this.simpleLogin);
        this.serviceData.getUser(this.simpleLogin)
          .then((response) => {
            this.currentRole = 'юзер';
            this.login = response.login;
            // this.repeatPassword = this.currentUser.password;
            this.name = response.fio;
            this.info = response.info;
            if (Utils.missing(response.userGroupId)) {
              this.group = 'Нет группы';
            } else {
              this.serviceData.getUserGroup(response.userGroupId)
                .then((response1) => {
                  this.group = response1.name;
                  this.grgr = response1.id;
                  this.isCompleted$.next(true);
                  this.cd.detectChanges();
                });
            }
            // this.$group = Utils.missing(response.userGroup) ? 'Нет группы' : response.userGroup.name;
            // this.isCompleted$.next(true);
            // this.cd.detectChanges();
          });
        break;
    }
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

  public get group() {
    return this.$group;
  }

  public set group(str: string) {
    if (Utils.exists(str)) {
      this.$group = str;
    }
  }

  public get old() {
    return this.$old;
  }

  public set old(str: string) {
    if (str !== null && str !== undefined) {
      this.$old = str;
    }
  }

  public get password() {
    return this.$password;
  }

  public set password(str: string) {
    if (str !== null && str !== undefined) {
      this.$password = str;
    }
  }

  public get repeatPassword() {
    return this.$repeat;
  }

  public set repeatPassword(str: string) {
    if (str !== null && str !== undefined) {
      this.$repeat = str;
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

  public accessed() {
    const role = this.role();
    return role !== this.baseRole.MAIN_ADMIN && role !== this.baseRole.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

  public checkExistingLogin() {
    return this.dataService.getSomeUser(this.$login) !== null && this.$login !== this.simpleLogin;
  }

  public checkOldPassword() {
    return Utils.exists(this.$old);
  }

  public checkRightLogin() {
    return Utils.exists(this.$login);
  }

  public checkFirstPassword() {
    return Utils.exists(this.$password);
  }

  public checkSecondPassword() {
    return Utils.exists(this.$repeat);
  }

  public checkPasswords() {
    return this.checkFirstPassword() && this.checkSecondPassword() && this.$password === this.$repeat;
  }

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkInfo() {
    return Utils.exists(this.$info);
  }

  public enabledToSave() {
    switch(this.role()) {
      case Roles.ADMIN:
        return Utils.exists(this.$login)
          && Utils.exists(this.$old)
          && Utils.exists(this.$name)
          && Utils.exists(this.$info)
          && (Utils.missing(this.$password) || this.checkPasswords());
        break;
      case Roles.INTEGRATOR:
      case Roles.SIMPLE:
        return Utils.exists(this.$login)
          && Utils.exists(this.$name)
          && Utils.exists(this.$info)
          && ((Utils.missing(this.$old) && Utils.missing(this.$password)) || this.checkPasswords());
        break;
    }
  }

  public saveCurrentSettings() {
    switch (this.role()) {
      case this.baseRole.ADMIN:
        if (Utils.missing(this.$password)) {
          this.serviceData.updateAdmin(this.$login, this.$old, this.$name, this.$info)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        } else {
          this.serviceData.updateAdminWithPassword(this.$login, this.$old, this.$password, this.$name, this.$info)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        }
        break;
      case this.baseRole.INTEGRATOR:
        if (Utils.missing(this.$password) && Utils.missing(this.$old)) {
          this.serviceData.updateIntegrator(this.$login, this.$name, this.$info, this.grgr)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        } else {
          this.serviceData.updateIntegratorWithPassword(this.$login, this.$old, this.$password, this.$name, this.$info, this.grgr)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        }
        break;
      case Roles.SIMPLE:
        if (Utils.missing(this.$password) && Utils.missing(this.$old)) {
          this.serviceData.updateUser(this.$login, this.$name, this.$info, this.grgr)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        } else {
          this.serviceData.updateUserWithPassword(this.$login, this.$old, this.$password, this.$name, this.$info, this.grgr)
            .then((response) => {
              if (response.ok) {
                this.router.navigate(['main/about'], {
                  queryParams: {}
                });
              } else {
                alert('Неверно введен пароль для изменения информации. Проверьте пароль и попробуйте снова');
              }
            });
        }
        break;
    }

  }


}
