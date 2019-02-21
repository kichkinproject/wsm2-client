import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { EditorComponent } from "../common-editor.component";
import {Utils} from '../../../utils/utils';

@Component({
  selector: 'user-group-editor',
  templateUrl: './user-group-editor.component.html',
  styleUrls: ['./user-group-editor.component.scss']
})
export class UserGroupEditorComponent extends EditorComponent implements AfterViewInit, OnDestroy {
  private name: string;
  private parent: number;

  public get name() {
    return this.name;
  }

  public set name(value: string) {
    if (Utils.exists(value)) {
      this.name = value;
    }
  }

  public get parent() {
    if (this.parent !== -1) {
      return this.parent; // TODO: заменить ид на элемент
    }
  }

  public set parent(value) {
    if (value === -1) {
      // TODO: разрывается связь между родителем и дочерним элементом
    } else {
      // TODO: появляется связь между элементами
    }
  }

  public checkName() {
    return Utils.exists(this.name);
  }
}
