import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'wsm-integrator-create',
  templateUrl: './integrator-create.component.html',
  styleUrls: ['./integrator-create.component.scss']
})
export class IntegratorCreateComponent implements AfterViewInit {
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
              private dataService: Wsm2DataService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.defaultSelect();

    this.isCompleted$.next(true);
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
    return role !== Roles.SIMPLE && role !== Roles.NONE;
  }

  public role() {
    return this.$user.getValue().user_role;
  }



  public checkExistingLogin() {
    return this.dataService.getSomeUser(this.$login) !== null;
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

  public createIntegrator() {
    this.dataService.addIntegrator(this.$login, this.$password, this.$name, this.$info);
    this.router.navigate(['/integrator-list'], {
      queryParams: {}
    });
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