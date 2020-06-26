import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { ToolbarModule } from '../shared/components/toolbar/toolbar.module';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { AngularMaterialModule } from '../shared/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService, AuthServiceImpl } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from '../shared/interceptor/httpconfig.interceptor';
import { UserInfoService, UserInfoServiceImpl } from '../shared/services/user-info.service';
import { SnackBarService } from '../shared/services/snack-bar.service';

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
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    SidebarModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    SnackBarService,
    { provide: AuthService, useClass: AuthServiceImpl },
    { provide: UserInfoService, useClass: UserInfoServiceImpl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
