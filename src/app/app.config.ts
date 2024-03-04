import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"password-manager-9be06","appId":"1:704880068443:web:30f34a9ac55cb73e4b3c7e","storageBucket":"password-manager-9be06.appspot.com","apiKey":"AIzaSyBHR4KqODgVA62aBI0tqbYsBNITvyJRwFM","authDomain":"password-manager-9be06.firebaseapp.com","messagingSenderId":"704880068443"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
