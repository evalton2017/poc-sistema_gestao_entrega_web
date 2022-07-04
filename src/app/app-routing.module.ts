import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-module').then((m) => m.LoginModule),
  },
  {canActivate:[AuthService],
    path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashBoardModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
