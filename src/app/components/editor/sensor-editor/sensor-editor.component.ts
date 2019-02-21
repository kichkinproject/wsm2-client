import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'sensor-editor',
  templateUrl: './sensor-editor.component.html',
  styleUrls: ['./sensor-editor.component.scss']
})
export class SensorEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
