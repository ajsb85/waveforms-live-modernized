import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';

//Components
import { DigitalIoComponent } from './digital-io.component';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(DigitalIoComponent),
    ],
    declarations: [
        DigitalIoComponent
    ],
    exports: [DigitalIoComponent],
    providers: [
    ]
})
export class DigitalIoModule { }