import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class LoaderComponent {

    @Input()
    public text: string;

    @Input()
    public set complete(value: boolean) {
        this._loaded.next(!value);
    }

    public get loaded(): Observable<boolean> {
        return this._loaded.asObservable();
    }

    private _loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}

@NgModule({
    imports: [CommonModule],
    exports: [LoaderComponent],
    declarations: [LoaderComponent]
})
export class LoaderModule {
}
