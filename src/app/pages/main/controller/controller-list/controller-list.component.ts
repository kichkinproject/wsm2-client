import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Role, Roles} from '../../../../models/role';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {GetCurrentUser, State} from '../../../../_state';
import {Wsm2DataService} from '../../../../services/wsm2-data.service';
import {Utils} from '../../../../utils/utils';
import {Controller} from '../../../../models/controller';
import {WsmDataService} from '../../../../services/wsm-data.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'wsm-controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ControllerListComponent implements AfterViewInit {
  private $user: BehaviorSubject<Role> = new BehaviorSubject<Role>(null);
  protected isCompleted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Array<Subscription> = [];
  private controllers: Array<Controller> = [];
  private baseRole = Roles;


  constructor(public router: Router,
              public activatedRoute: ActivatedRoute,
              public store: Store<State>,
              private serviceData: WsmDataService,
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
        this.controllers.slice(0, this.controllers.length);
        break;
      case Roles.INTEGRATOR:
        this.isCompleted$.next(false);
        this.controllers = [];
        this.serviceData.getIntegrator(this.$user.getValue().user_login)
          .then((response) => {
            if (Utils.missing(response.ok)) {
              this.serviceData.getControllersByGroup(response.userGroupId)
                .then((response1) => {
                  if (response1.length !== 0) {
                    this.controllers.push(new Controller(response1.id,
                      response1.name,
                      response1.description,
                      response1.type,
                      response1.userGroupId));
                  }
                });
            }
            this.isCompleted$.next(true);
            this.cd.detectChanges();
          });
        break;
      case Roles.SIMPLE:
        this.controllers.slice(0, this.controllers.length);
        break;
      default:
        this.controllers.slice(0, this.controllers.length);
        break;
    }
  }

  public createThingLinks(id) {
    this.serviceData.getController(id)
      .then((response) => {
        if (Utils.exists(response)) {
          const contr = new Controller(
            response.id,
            response.name,
            response.description,
            response.type,
            response.userGroupId
          );
          this.router.navigate(['main/controller/controller-thing-link', id.toString()], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим настроить устройства для не существующего контроллера');
        }
      });
  }

  public createSensorLinks(id) {
    this.serviceData.getController(id)
      .then((response) => {
        if (Utils.exists(response)) {
          const contr = new Controller(
            response.id,
            response.name,
            response.description,
            response.type,
            response.userGroupId
          );
          this.router.navigate(['main/controller/controller-sensor-link', id.toString()], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим настроить датчики для не существующего контроллера');
        }
      });
  }

  public ngAfterViewInit() {
    // this.cd.detectChanges();
    this.updateCollection();
  }

  public get completed(): Observable<boolean> {
    return this.isCompleted$.asObservable();
  }

  public findNewController() {
    this.router.navigate(['main/controller/controller-find'], {
      queryParams: {}
    });
  }

  public createReportOnControllers() {
    alert('Блок отчетности по контроллерам недоступен');
  }

  public updateControllersList() {
    // this.cd.detectChanges();
    this.updateCollection();
  }

  public viewController(id: number) {
    this.serviceData.getController(id)
      .then((response) => {
        if (Utils.exists(response)) {
          const contr = new Controller(
            response.id,
            response.name,
            response.description,
            response.type,
            response.userGroupId
          );
          this.router.navigate(['main/controller/controller-view', id.toString()], {
            queryParams: {}
          });
        } else {
          console.log('Ошибка, хотим просмотреть не существующий контроллер');
        }
      });
  }

  public removeController(id: number) {
    if (confirm(`Вы уверены, что хотите удалить контроллер?`)) {
      this.serviceData.deleteController(id)
        .then((response) => {
          this.updateCollection();
        });
    }
  }

  public accessed() {
    const role = this.role();
    return role !== Roles.NONE;
  }

  public anyShown() {
    return this.controllers.length !== 0;
  }

  public role() {
    return this.$user.getValue().user_role;
  }




}
