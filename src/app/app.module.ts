import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

//Modules
import { CoreModule } from './core/core.module';
import { SettingsModule } from '../pages/settings/settings.module';
import { InstrumentPanelModule } from '../pages/instrument-panel/instrument-panel.module';
import { DeviceManagerPageModule } from '../pages/device-manager-page/device-manager-page.module';

//Services
import { CommandUtilityService } from '../services/device/command-utility.service';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        SettingsModule,
        InstrumentPanelModule,
        DeviceManagerPageModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [MyApp],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [CommandUtilityService]
})
export class AppModule { }
