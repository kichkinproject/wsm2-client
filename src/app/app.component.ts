import { Component, ElementRef, Inject, OnDestroy, Renderer2 } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Wsm2AccountService } from "./services/wsm2-account-service";
import { select, Store } from "@ngrx/store";
import { State, GetLoaded, GetTheme  } from "./_state";
import { IAppConfig } from "./app.config";
import { AppConfigToken } from "./models/token";
import { environment } from "../environments/environment";
import { Subscription } from "rxjs";
import { LayoutLoaded } from './_state/actions/layout.actions';

@Component({
  selector: 'wsm-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private sTimeout;
  private theme: string;

  constructor(private meta: Meta,
              private renderer: Renderer2,
              private elementRef: ElementRef,
              private router: Router,
              private accountService: Wsm2AccountService,
              private store: Store<State>
              // , @Inject(AppConfigToken) private config: IAppConfig
  ) {
    this.meta.addTag({ name: 'version', content: environment.version });
    this.subscriptions.push(
      this.store.pipe(select(GetLoaded)).subscribe(stat => this.toggleApp(stat)),
      this.store.pipe(select(GetTheme)).subscribe(theme => this.toggleTheme(theme)),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }

  private toggleTheme(theme: string): void {
    if (this.theme !== theme) {
      this.renderer.removeClass(document.body, `theme-${this.theme}`);
      this.theme = theme;
      this.renderer.addClass(document.body, `theme-${this.theme}`);
    }
  }

  private showDelay() {
    this.store.dispatch(new LayoutLoaded(true));
  }

  private toggleApp(status: boolean): void {
    document.getElementById('app-loading').style.display = (status) ? 'none' : 'flex';
    this.elementRef.nativeElement.style.display = (status) ? 'flex' : 'none';
    this.sTimeout = setTimeout(() => this.showDelay(), 30000);
  }
}
