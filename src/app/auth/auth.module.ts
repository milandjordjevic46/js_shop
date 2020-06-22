import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { redirectTo: 'auth' },
  },
];
@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AuthModule {}
