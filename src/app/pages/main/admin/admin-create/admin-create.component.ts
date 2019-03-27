import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {WsmDataService} from '../../../../services/wsm-data.service';

@Component({
  selector: 'wsm-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AdminCreateComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $login: string;
  private $password: string;
  private $repeatPassword: string;
  private $name: string;
  private $info: string;

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
    // this.defaultSelect();
    // setTimeout(1000);
    this.isCompleted$.next(true);
    this.cd.detectChanges();
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

  public get repeatPassword() {
    return this.$repeatPassword;
  }

  public set repeatPassword(str: string) {
    if (Utils.exists(str)) {
      this.$repeatPassword = str;
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
    return role === Roles.MAIN_ADMIN || role === Roles.ADMIN;
  }

  public role() {
    return this.$user.getValue().user_role;
  }



  public checkExistingLogin() {
    if (Utils.exists(this.$login)) {
      // console.log(result);
    }
    return false;
    //this.dataService.getSomeUser(this.$login) !== null;
    // const result = this.dataService.getSomeUser(this.$login);
    // result[0]
    //   .then((response) => {
    //     return (response !== null).json();
    //   })
    //   .then(result[1])
    //   .then((response) => {
    //     return (response !== null).json();
    //   });
  }

  public checkRightLogin() {
    return Utils.exists(this.$login);
  }

  public checkFirstPassword() {
    return Utils.exists(this.$password);
  }

  public checkSecondPassword() {
    return Utils.exists(this.$repeatPassword);
  }

  public checkPasswords() {
    return this.checkFirstPassword() && this.checkSecondPassword() && this.$password === this.$repeatPassword;
  }

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkInfo() {
    return Utils.exists(this.$info);
  }

  public createAdmin() {
    this.serviceData.getAdmin(this.$login)
      .then((response) => {
        if (Utils.exists(response.ok) && (!response.ok || response.statusText !== 'No Content')) {
          alert('Пользователь с таким логином уже зарегистрирован');
        } else {
          this.serviceData.getUser(this.$login)
            .then((response1) => {
              if (Utils.exists(response1.ok) && (!response1.ok || response1.statusText !== 'No Content')) {
                alert('Пользователь с таким логином уже зарегистрирован');
              } else {
                this.isCompleted$.next(false);
                this.serviceData.addAdmin(this.$login, this.$password, this.$name, this.$info)
                  .then((response2) => {
                    this.router.navigate(['main/admin/admin-list'], {
                      queryParams: {}
                    });
                    this.isCompleted$.next(true);
                    this.cd.detectChanges();
                  });
              }
            });
        }
      });
    // this.dataService.addAdmin(this.$login, this.$password, this.$name, this.$info);
  }

  public enabledToAdd() {
    return Utils.exists(this.$login)
      && Utils.exists(this.$password)
      && Utils.exists(this.$repeatPassword)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info)
      && this.checkPasswords();
  }

}
