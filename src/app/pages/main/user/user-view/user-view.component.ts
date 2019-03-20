import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';

@Component({
  selector: 'wsm-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UserViewComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private $login: string;
  private $name: string;
  private $info: string;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role)),
    );
  }

  private simpleLogin: string;

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.simpleLogin = this.activatedRoute.params['_value']['login'];
    const simple = this.dataService.getUser(this.simpleLogin);
    this.login = simple.login;
    this.name = simple.name;
    this.info = simple.info;
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
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
}
