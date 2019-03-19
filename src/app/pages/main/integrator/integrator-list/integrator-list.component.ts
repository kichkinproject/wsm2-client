import {AfterViewInit, Component} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data-service';
import {Utils} from '../../../../utils/utils';
import {User} from '../../../../models/user';

@Component({
  selector: 'wsm-integrator-list',
  templateUrl: './integrator-list.component.html',
  styleUrls: ['./integrator-list.component.scss']
})
export class IntegratorListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private integrators: Array<User> = [];
  private baseRole = Roles;

  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private dataService: Wsm2DataService) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    const user = this.dataService.getSomeUser(this.$user.getValue().user_login);
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.integrators = Utils.pushAll([], this.dataService.getIntegrators());
        break;
      case Roles.INTEGRATOR:
        this.integrators = Utils.pushAll([], this.dataService.getIntegratorsByChildrenGroup(user.group));

        break;
      default:
        this.integrators.slice(0, this.integrators.length);
        break;
    }
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public addNewIntegrator() {
    this.router.navigate(['/integrator-create'], {
      queryParams: {}
    });
  }

  public createReportOnIntegrators() {
    console.log('Блок отчетности по интеграторам недоступен');
  }

  public updateAdminList() {
    this.isCompleted$.next(false);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public editIntegrator(login: string) {
    if (Utils.exists(this.dataService.getIntegrator(login))) {
      this.router.navigate(['/integrator-edit', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим редактировать не существующего интегратора');
    }
  }
  public viewIntegrator(login: string) {
    if (Utils.exists(this.dataService.getIntegrator(login))) {
      this.router.navigate(['/integrator-view', login], {
        queryParams: {}
      });
    } else {
      console.log('Ошибка, хотим просмотреть не существующего интегратора');
    }
  }

  public removeIntegrator(login: string) {
    this.isCompleted$.next(false);
    this.dataService.deleteIntegrator(login);
    this.updateCollection();
    this.isCompleted$.next(true);
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.SIMPLE && role !== Roles.NONE;
  }

  public anyShown() {
    return this.integrators.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }

}
