import {ControllerType} from './entity-type';

export class Controller {
  id: number;
  // uniqId: string;
  name: string;
  description: string;
  type: ControllerType;
  master: number;

  constructor(id: number, /*uni: string,*/ name: string, description: string, type: ControllerType = ControllerType.CONTROLLER_TYPE_1, master: number = -1) {
    this.id = id;
    // this.uniqId = uni;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
