import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminEditorComponent } from "./admin-editor/admin-editor.component";
import { IntegratorEditorComponent } from "./integrator-editor/integrator-editor.component";
import { ControllerEditorComponent } from "./controller-editor/controller-editor.component";
import { ScenarioEditorComponent } from "./scenario-editor/scenario-editor.component";
import { SensorEditorComponent } from "./sensor-editor/sensor-editor.component";
import { ThingEditorComponent } from "./thing-editor/thing-editor.component";
import { UserEditorComponent } from "./user-editor/user-editor.component";
import { UserGroupEditorComponent } from "./user-group-editor/user-group-editor.component";

NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminEditorComponent,
    IntegratorEditorComponent,
    ScenarioEditorComponent,
    ControllerEditorComponent,
    SensorEditorComponent,
    ThingEditorComponent,
    UserEditorComponent,
    UserGroupEditorComponent
  ],
  exports: [
    AdminEditorComponent,
    IntegratorEditorComponent,
    ScenarioEditorComponent,
    ControllerEditorComponent,
    SensorEditorComponent,
    ThingEditorComponent,
    UserEditorComponent,
    UserGroupEditorComponent
  ],
  entryComponents: [
    AdminEditorComponent,
    IntegratorEditorComponent,
    ScenarioEditorComponent,
    ControllerEditorComponent,
    SensorEditorComponent,
    ThingEditorComponent,
    UserEditorComponent,
    UserGroupEditorComponent
  ]
})
export class EditorModule {}
