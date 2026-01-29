import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { playSkipBackOutline, playSkipForwardOutline, arrowBack, eyeOff, eye, close, heart, play } from 'ionicons/icons';

addIcons({
  'arrow-back': arrowBack,
  'eye-off': eyeOff,
  'eye': eye,
  'close': close,
  'heart': heart,
  'play': play,
  'play-skip-back-outline': playSkipBackOutline,
  'play-skip-forward-outline': playSkipForwardOutline
});

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import {Storage} from '@ionic/storage-angular';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage
  ],
});
