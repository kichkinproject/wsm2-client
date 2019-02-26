import { ControllerType } from "./entity-type";

export class Controller {
  id: number;
  name: string;
  description: string;
  type: ControllerType;
  master: number;

  constructor(id: number, name: string, description: string, type: ControllerType, master: number = -1) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
