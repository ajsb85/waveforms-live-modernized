import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

//Pages
import { CalibratePage } from './calibrate';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(CalibratePage)
    ],
    declarations: [
        CalibratePage
    ],
    exports: [CalibratePage]
})
export class CalibrateModule { }