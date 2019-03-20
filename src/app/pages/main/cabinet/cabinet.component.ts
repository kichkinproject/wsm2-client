import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { Role, Roles } from "../../../models/role";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { GetCurrentUser, State } from "../../../_state";
import { select, Store } from "@ngrx/store";
import { Wsm2DataService } from "../../../services/wsm2-data-service";
import { Utils } from "../../../utils/utils";
import { User } from "../../../models/user";

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
  private $password: string;
  private $repeat: string;
  private $name: string;
  private $info: string;
  private currentUser: User;
  private baseRole = Roles;
  private currentRole = '';

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
    this.simpleLogin = this.activatedRoute.params['_value']['login'];
    switch (this.role()) {
      case this.baseRole.ADMIN:
          this.currentUser = this.dataService.getAdmin(this.simpleLogin);
          this.currentRole = 'администратор';
        break;
      case this.baseRole.INTEGRATOR:
        this.currentUser = this.dataService.getIntegrator(this.simpleLogin);
        this.currentRole = 'интегратор';
        break;
      case this.baseRole.SIMPLE:
        this.currentUser = this.dataService.getUser(this.simpleLogin);
        this.currentRole = 'юзер';
        break;
    }
    this.login = this.currentUser.login;
    this.password = this.currentUser.password;
    this.repeatPassword = this.currentUser.password;
    this.name = this.currentUser.name;
    this.info = this.currentUser.info;
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
    return this.$repeat;
  }

  public set repeatPassword(str: string) {
    if (Utils.exists(str)) {
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
    return Utils.exists(this.$login)
      && Utils.exists(this.$password)
      && Utils.exists(this.$repeat)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info)
      && this.checkPasswords();
  }

  public saveCurrentSettings() {
    switch (this.role()) {
      case this.baseRole.ADMIN:
        const simpleAdmin = this.dataService.getAdmin(this.simpleLogin);
        this.dataService.updateAdmin(simpleAdmin.login, this.$login, this.$password, this.$name, this.info);
        break;
      case this.baseRole.INTEGRATOR:
        const simpleIntegrator = this.dataService.getIntegrator(this.simpleLogin);
        this.dataService.updateIntegrator(simpleIntegrator.login, this.$login, this.$password, this.$name, this.info);
        break;
      case this.baseRole.SIMPLE:
        const simpleUser = this.dataService.getUser(this.simpleLogin);
        this.dataService.updateUser(simpleUser.login, this.$login, this.$password, this.$name, this.info);
        break;
    }
    this.router.navigate(['main/about'], {
      queryParams: {}
    });
  }


}
