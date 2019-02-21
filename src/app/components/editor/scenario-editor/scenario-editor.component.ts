import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'scenario-editor',
  templateUrl: './scenario-editor.component.html',
  styleUrls: ['./scenario-editor.component.scss']
})
export class ScenarioEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
