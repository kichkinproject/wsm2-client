import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCollectionComponent } from "./admin-collection/admin-collection.component";
import { IntegratorCollectionComponent } from "./integrator-collection/integrator-collection.component";
import { ControllerCollectionComponent } from "./controller-collection/controller-collection.component";
import { ScenarioCollectionComponent } from "./scenario-collection/scenario-collection.component";
import { SensorCollectionComponent } from "./sensor-collection/sensor-collection.component";
import { ThingCollectionComponent } from "./thing-collection/thing-collection.component";
import { UserCollectionComponent } from "./user-collection/user-collection.component";
import { UserGroupCollectionComponent } from "./user-group-collection/user-group-collection.component";

NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminCollectionComponent,
    IntegratorCollectionComponent,
    ScenarioCollectionComponent,
    ControllerCollectionComponent,
    SensorCollectionComponent,
    ThingCollectionComponent,
    UserCollectionComponent,
    UserGroupCollectionComponent
  ],
  exports: [
    AdminCollectionComponent,
    IntegratorCollectionComponent,
    ScenarioCollectionComponent,
    ControllerCollectionComponent,
    SensorCollectionComponent,
    ThingCollectionComponent,
    UserCollectionComponent,
    UserGroupCollectionComponent
  ],
  entryComponents: [
    AdminCollectionComponent,
    IntegratorCollectionComponent,
    ScenarioCollectionComponent,
    ControllerCollectionComponent,
    SensorCollectionComponent,
    ThingCollectionComponent,
    UserCollectionComponent,
    UserGroupCollectionComponent
  ]
})
export class EditorModule {}
