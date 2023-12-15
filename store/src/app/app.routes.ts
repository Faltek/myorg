import { TestAppComponent } from './components/testAppComponent.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { environment } from '../environments/environment';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';

export const appRoutes: Route[] = [
  {
    path: 'checkout',
    loadChildren: () => import('checkout/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'testapp',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: `${environment.REMOTE_ENTRY_MFE_RT_ARCHITECTS}`,
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
