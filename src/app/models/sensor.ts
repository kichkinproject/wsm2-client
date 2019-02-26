import { ScenarioType, SensorType } from "./entity-type";

export class Sensor {
  id: number;
  name: string;
  description: string;
  type: SensorType;
  master: number;

  constructor(id: number, name: string, description: string, type: SensorType, master: number = -1) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.master = master;
  }
}
