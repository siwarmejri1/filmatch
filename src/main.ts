import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; 
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { environment } from './environments/environment';


import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), //lconnexion mtaa lprojet firebase
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
});
// hedheya yactivi l'interface mta3 l caméra wa9et ly l'application tekhdem fel navigateur (ionic serve)
defineCustomElements(window);
