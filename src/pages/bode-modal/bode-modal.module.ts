import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

//Pages
import { BodeModalPage } from './bode-modal';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(BodeModalPage)
    ],
    declarations: [
        BodeModalPage
    ],
    exports: [BodeModalPage]
})
export class BodeModalPageModule { }