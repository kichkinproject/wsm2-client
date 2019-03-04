import { ScenarioType } from "./entity-type";

export class UserGroup {
  id: number;
  name: string;
  description: string;
  parentId: number;

  constructor(id: number, name: string, desc: string, parentId: number = -1) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.parentId = parentId;
  }

}
