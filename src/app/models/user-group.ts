import { ScenarioType } from "./entity-type";

export class UserGroup {
  id: number;
  name: string;
  parentId: number;

  constructor(id: number, name: string, parentId: number = -1) {
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }

}
