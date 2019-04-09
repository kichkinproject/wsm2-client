import { ScenarioType } from './entity-type';
import { Roles } from "./role";

export class Scenario {
  id: number;
  name: string;
  description: string;
  script: string;
  type: ScenarioType;
  publicity: boolean;
  creator: number;

  constructor(id: number, name: string, description: string, script: string, type: ScenarioType, publicity: boolean = true, creator: number = null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.script = script;
    this.type = type;
    this.publicity = publicity;
    this.creator = creator;
  }
}
