import { ScenarioType, SensorType, ThingType } from "./entity-type";

export class Thing {
  id: number;
  name: string;
  description: string;
  type: ThingType;
  master: login;

  constructor(id: number, name: string, description: string, type: ThingType, master: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
