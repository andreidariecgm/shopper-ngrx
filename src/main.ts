import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from 'src/app/app.config';
import { AppComponent } from 'src/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
