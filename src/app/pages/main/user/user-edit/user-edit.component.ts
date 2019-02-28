import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'wsm-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $login: string;
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

  private simpleLogin: string;

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.simpleLogin = this.activatedRoute.params['login'];
    const integrator = this.dataService.getUser(this.simpleLogin);
    this.login = integrator.login;
    this.name = integrator.name;
    this.info = integrator.info;
    this.isCompleted$.next(true);
  }

  public accessed() {
    const role = this.role();
    return role === Roles.ADMIN || role === Roles.INTEGRATOR;
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

  public saveUser() {
    const simple = this.dataService.getUser(this.simpleLogin);
    this.dataService.updateUser(simple.login, this.$login, simple.password, this.$name, this.$info);
    // this.router.navigate(['/scenario-list'], {
    //   queryParams: {}
    // });
  }

  public enabledToSave() {
    return Utils.exists(this.$login)
      && Utils.exists(this.$name)
      && Utils.exists(this.$info);
  }
}
