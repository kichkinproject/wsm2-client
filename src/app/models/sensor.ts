import { ScenarioType, SensorType } from "./entity-type";

export class Sensor {
  id: number;
  name: string;
  description: string;
  type: SensorType;
  master: string;

  constructor(id: number, name: string, description: string, type: SensorType, master: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
