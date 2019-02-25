import {Roles} from './role';

export class User {
  login: string;
  password: string;
  name: string;
  info: string;
  role: Roles;
  group: number;

  constructor(log: string, pass: string, nam: string, inf: string, rol: Roles, group: number = -1) {
    this.login = log;
    this.password = pass;
    this.name = nam;
    this.info = inf;
    this.role = rol;
    this.group = group;
  }
}
