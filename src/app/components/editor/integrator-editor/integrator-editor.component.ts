import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'integrator-editor',
  templateUrl: './integrator-editor.component.html',
  styleUrls: ['./integrator-editor.component.scss']
})
export class IntegratorEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
