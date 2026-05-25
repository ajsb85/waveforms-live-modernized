import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';

// Pages
import { SlowUSBModalPage } from './slow-usb-modal';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        IonicModule.forRoot(SlowUSBModalPage)
    ],
    declarations: [
        SlowUSBModalPage
    ],
    exports: [SlowUSBModalPage]
})
export class SlowUSBModalPageModule {}