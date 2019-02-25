import { ControllerType, ScenarioType, SensorType } from "./entity-type";

export class Controller {
  id: number;
  name: string;
  description: string;
  type: ControllerType;
  master: string;

  constructor(id: number, name: string, description: string, type: ControllerType, master: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
