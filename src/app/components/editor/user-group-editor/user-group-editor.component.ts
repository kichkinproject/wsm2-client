import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";

@Component({
  selector: 'user-group-editor',
  templateUrl: './user-group-editor.component.html',
  styleUrls: ['./user-group-editor.component.scss']
})
export class UserGroupEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {

}
