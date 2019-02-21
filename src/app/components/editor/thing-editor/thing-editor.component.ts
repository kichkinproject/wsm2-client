import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'thing-editor',
  templateUrl: './thing-editor.component.html',
  styleUrls: ['./thing-editor.component.scss']
})
export class ThingEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
