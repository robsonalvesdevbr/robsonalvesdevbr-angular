import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/home.routes').then(m => m.HOME_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
