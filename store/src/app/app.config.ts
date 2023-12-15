import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { loadRemoteModule } from './utils/federation-utils';

export function initializeApp(): () => void {
  return () => {
    loadRemoteModule({
      remoteEntry: 'http://localhost:4205/remoteEntry.js',
      remoteName: 'test-app',
      exposedModule: './Module',
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), provideRouter(appRoutes), 
     {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
  },
],
};
