import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

//Pages
import { SettingsPage } from './settings';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(SettingsPage)
    ],
    declarations: [
        SettingsPage
    ],
    exports: [SettingsPage]
})
export class SettingsModule { }