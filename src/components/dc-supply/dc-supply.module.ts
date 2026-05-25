import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';

//Components
import { DcSupplyComponent } from './dc-supply.component';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(DcSupplyComponent),
    ],
    declarations: [
        DcSupplyComponent
    ],
    exports: [DcSupplyComponent],
    providers: [
    ]
})
export class DcSupplyModule { }