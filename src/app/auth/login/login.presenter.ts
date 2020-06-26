import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  AccessToken,
  User,
} from 'src/app/shared/system-cloud/system-cloud.models';
import { tap, finalize, flatMap } from 'rxjs/operators';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { Router } from '@angular/router';
import { IsLoggedService } from 'src/app/shared/services/is-logged.service';

export abstract class LoginPresenter {
  abstract login(email: string, password: string): Observable<any>;
  abstract openSignUpScreen(): void;
  abstract openForgotPasswordScreen(): void;
}

@Injectable()
export class LoginPresenterImpl implements LoginPresenter {
  constructor(
    private auth_service: AuthService,
    private user_info: UserInfoService,
    private router: Router,
    private isLoggedService: IsLoggedService,
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.auth_service.login(email, password).pipe(
      tap((data) => {
        this.user_info.setToken(data.access_token);
      }),
      flatMap(() => {
        return this.user_info.takeUserInfo();
      }),
      tap((res) => {
        this.user_info.setUserInfo(res);
        this.isLoggedService.setLogged(true);
      }),
      tap(() => {
        this.router.navigate(['/home']);
      })
    );
  }

  openSignUpScreen(): void {
    throw Error('May be implemented in the future');
  }

  openForgotPasswordScreen(): void {
    throw Error('May be implemented in the future');
  }
}
