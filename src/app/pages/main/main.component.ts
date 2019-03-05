import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Utils } from "../../utils/utils";
import { Role, Roles } from "../../models/role";
import { BehaviorSubject, Subscription } from "rxjs";
import { GetCurrentUser, State } from "../../_state";
import { select, Store } from "@ngrx/store";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'wsm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  private subscriptions: Array<Subscription> = [];

  constructor(private router: Router,
              private store: Store<State>,
              private activatedRoute: ActivatedRoute) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  public get isMainAdmin() {
    return Utils.exists(this.$user.getValue()) && this.$user.getValue().user_role === Roles.MAIN_ADMIN;
  }

  public get isAdmin() {
    return Utils.exists(this.$user.getValue()) && this.$user.getValue().user_role === Roles.ADMIN;
  }

  public get isIntegrator() {
    return Utils.exists(this.$user.getValue()) && this.$user.getValue().user_role === Roles.INTEGRATOR;
  }

  public get isUser() {
    return Utils.exists(this.$user.getValue()) && this.$user.getValue().user_role === Roles.SIMPLE;
  }

  private unsubscribeEvents(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  public ngOnInit(): void {
    if (Utils.missing(this.$user.getValue())) {
      this.router.navigate(['/identification'], {
        queryParams: {}
      });
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeEvents();
  }

  public needToGoBack(): boolean {
    return this.router.url.indexOf('about') === -1;
  }

  public goToPrevious() {
    if (this.router.url.indexOf('list') !== -1) {
      this.router.navigate(['/admin-list'], {
        queryParams: {}
      });
    } else {
      this.router.navigate(['/about'], {
        queryParams: {}
      });
    }
  }

  public goToCabinet() {
    this.router.navigate(['/cabinet'], {
      queryParams: {}
    });
  }

  public unautentificateUser() {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(() => this.$user.next(null))
    );
    this.router.navigate(['/identification'], {
      queryParams: {}
    });
  }

}
