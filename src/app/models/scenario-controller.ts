export class ScenarioController {
  id: number;
  scenarioId: number;
  controllerId: number;
  activated: boolean;

  constructor(id: number, scenarioId: number, controllerId: number, activated: boolean = false) {
    this.id = id;
    this.scenarioId = scenarioId;
    this.controllerId = controllerId;
    this.activated = activated;
  }
}
