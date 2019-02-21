import { Component } from '@angular/core';
import { Utils } from "../../utils/utils";
import { Role } from "../../models/role";

@Component({
  selector: 'wsm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public get isMainAdmin() {
    return Utils.exists(this.role) && this.role.user_role === 1;
  }

  public get isAdmin() {
    return Utils.exists(this.role) && this.role.user_role === 2;
  }

  public get isIntegrator() {
    return Utils.exists(this.role) && this.role.user_role === 3;
  }

  public get isUser() {
    return Utils.exists(this.role) && this.role.user_role === 4;
  }

  public role: Role;
}
