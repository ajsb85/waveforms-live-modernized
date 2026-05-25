import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/core/loader';

import { AppModule } from './app.module';
import '../compat/rxjs-compat';

defineCustomElements(window);

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(error => console.error(error));
