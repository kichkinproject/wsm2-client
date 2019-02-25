import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.scss']
})
export class AdminEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {
  private $login: string;
  private $password: string;
  private $repeatPassword: string;
  private $name: string;
  private $info: string;

  public get login() {
    return this.$login;
  }

  public set login(log: string) {
    if (Utils.exists(log)) {  // TODO: сделать запрос на сервер на проверку уникальности логина
      this.$login = log;
    }
  }

  public get password() {
    return this.$password;
  }

  public set password(pass) {
    if (Utils.exists(pass)) {
      this.$password = pass;
    }
  }

  public get repeatPassword() {
    return this.$repeatPassword;
  }

  public set repeatPassword(pass) {
    if (Utils.exists(pass)) {
      this.$repeatPassword = pass;
    }
  }

  public get name() {
    return this.$name;
  }

  public set name(n) {
    if (Utils.exists(n)) {
      this.$name = n;
    }
  }

  public get info() {
    return this.$info;
  }

  public set info(i) {
    if (Utils.exists(i)) {
      this.$info = i;
    }
  }

  constructor() {
    super();
  }

  public checkExistingLogin() {
    return false; // TODO: запрос к серверу на уникальность логина
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
    return this.$password === this.$repeatPassword;
  }

  public checkName() {
    return Utils.exists(this.$name);
  }

  public checkInfo() {
    return Utils.exists(this.$info);
  }
}
