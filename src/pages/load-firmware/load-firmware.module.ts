import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { LoadFirmwarePage } from './load-firmware';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(LoadFirmwarePage)
    ],
    declarations: [
        LoadFirmwarePage
    ],
    exports: [LoadFirmwarePage]
})
export class LoadFirmwareModule { }