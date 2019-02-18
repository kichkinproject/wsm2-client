import { ScenarioType } from './scenario_type';

export class Scenario {
  id: number;
  name: string;
  description: string;
  script: string;
  type: ScenarioType;
}
