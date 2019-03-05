export enum Roles {
  NONE = 0,
  MAIN_ADMIN = 1,
  ADMIN = 2,  // Локальный администратор, ведущий учет интеграторов
  INTEGRATOR = 3, // Интегратор, создающий пользователей, группы пользователей и сценарии
  SIMPLE = 4  // Пользователь системы, вкл/выкл сценариев, работа в смежной системе
}

export class Role {
  public user_login: string;
  public user_name: string; // Имя пользователя
  public user_role: Roles; // Пользовательская роль
  public settings: any;

  constructor(model: any) {
    this.user_login = model.login;
    this.user_name = model.name;
    this.user_role = model.role;
  }

  public hasAccess() {
    return (this.user_role === Roles.MAIN_ADMIN
      || this.user_role === Roles.ADMIN
      || this.user_role === Roles.INTEGRATOR
      || this.user_role === Roles.SIMPLE);
  }
}
