import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { IonicModule } from 'ionic-angular';

//Pages
import { UpdateFirmwarePage } from './update-firmware';

//Services
import { CommandUtilityService } from '../../services/device/command-utility.service';

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
imports: [
        SharedModule,
        IonicModule.forRoot(UpdateFirmwarePage)
    ],
    declarations: [
        UpdateFirmwarePage
    ],
    exports: [UpdateFirmwarePage],
    providers: [CommandUtilityService]
})
export class UpdateFirmwareModule { }