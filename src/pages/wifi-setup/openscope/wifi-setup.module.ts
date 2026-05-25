import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

//Pages
import { WifiSetupPage } from './wifi-setup';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(WifiSetupPage)
    ],
    declarations: [
        WifiSetupPage
    ],
    exports: [WifiSetupPage]
})
export class WifiSetupModule { }