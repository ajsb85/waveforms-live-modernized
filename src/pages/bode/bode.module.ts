import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { BodePage } from './bode';

//Components
import { BodePlotComponent } from '../../components/bode-plot/bode-plot.component';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(BodePage)
    ],
    declarations: [
        BodePlotComponent,
        BodePage
    ],
    exports: [
        BodePage
    ]
})
export class BodePageModule { }