import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'controller-editor',
  templateUrl: './controller-editor.component.html',
  styleUrls: ['./controller-editor.component.scss']
})
export class ControllerEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
