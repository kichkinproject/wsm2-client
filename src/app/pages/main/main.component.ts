import { Component, OnDestroy } from "@angular/core";
import { Utils } from "../../utils/utils";
import { Role, Roles } from "../../models/role";
import { BehaviorSubject, Subscription } from "rxjs";
import { GetCurrentUser, State } from "../../_state";
import { select, Store } from "@ngrx/store";
import { Router } from "@angular/router";

@Component({
  selector: 'wsm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  private subscriptions: Array<Subscription> = [];

  constructor(private router: Router,
              private store: Store<State>) {
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

  public ngOnDestroy(): void {
    this.unsubscribeEvents();
  }

}
