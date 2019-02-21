import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";
import {ScenarioType} from '../../../models/scenario_type';
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {
  private name: string;
  private description: string;
  private script: string;
  private type: ScenarioType;

  public get name() {
    return this.name;
  }

  public set name(value: string) {
    if (Utils.exists(value)) {
      this.name = value;
    }
  }

  public get description() {
    return this.description;
  }

  public set description(value: string) {
    if (Utils.exists(value)) {
      this.description = value;
    }
  }
}

