import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {User} from '../../../../models/user';
import { WsmDataService } from "../../../../services/wsm-data.service";

@Component({
  selector: 'wsm-integrator-list',
  templateUrl: './integrator-list.component.html',
  styleUrls: ['./integrator-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
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
              public serviceData: WsmDataService,
              private dataService: Wsm2DataService,
              private cd: ChangeDetectorRef) {
    this.subscriptions.push(
      this.store.pipe(select(GetCurrentUser)).subscribe(role => this.$user.next(role))
    );
  }

  private updateCollection() {
    const role = this.$user.getValue().user_role;
    switch (role) {
      case Roles.MAIN_ADMIN:
      case Roles.ADMIN:
        this.integrators = this.serviceData.getIntegrators();
        break;
      case Roles.INTEGRATOR:
        this.serviceData.getUser(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.integrators = Utils.pushAll([], this.serviceData.getIntegratorsByChildrenGroup(response.userGroup.id));
            } else {
              this.integrators = [];
            }});
        break;
      default:
        this.integrators.slice(0, this.integrators.length);
        break;
    }
  }

  public ngAfterViewInit() {
    this.isCompleted$.next(false);
    // this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public addNewIntegrator() {
    this.router.navigate(['main/integrator/integrator-create'], {
      queryParams: {}
    });
  }

  public createReportOnIntegrators() {
    alert('Блок отчетности по интеграторам недоступен');
  }

  public updateAdminList() {
    this.isCompleted$.next(false);
    this.cd.detectChanges();
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
  }

  public editIntegrator(login: string) {
    this.serviceData.getIntegrator(login)
      .then((response) => {
        if (Utils.exists(response)) {
          const admin = new User(
            response.login,
            '',
            response.fio,
            response.info,
            Roles.INTEGRATOR,
            -1
          );
          this.router.navigate(['main/integrator/integrator-edit', login], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим редактировать не существующего интегратора');
        }
      });
  }

  public viewIntegrator(login: string) {
    this.serviceData.getIntegrator(login)
      .then((response) => {
        if (Utils.exists(response)) {
          const admin = new User(
            response.login,
            '',
            response.fio,
            response.info,
            Roles.INTEGRATOR,
            -1
          );
          this.router.navigate(['main/integrator/integrator-view', login], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим просмотреть не существующего интегратора');
        }
      });
  }

  public removeIntegrator(login: string) {
    this.isCompleted$.next(false);
    this.cd.detectChanges();
    this.dataService.deleteIntegrator(login);
    this.updateCollection();
    this.isCompleted$.next(true);
    this.cd.detectChanges();
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
