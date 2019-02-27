import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
    selector: 'selection-panel',
    templateUrl: './selection-panel.component.html',
    styleUrls: ['./selection-panel.component.scss']
})
export class SelectionPanelComponent {
    constructor() {
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [SelectionPanelComponent],
    declarations: [SelectionPanelComponent]
})
export class SelectionPanelModule {
}
