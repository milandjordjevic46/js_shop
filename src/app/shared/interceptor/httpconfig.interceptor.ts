import { Injectable } from '@angular/core';
// import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

import { UserInfoService } from '../services/user-info.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    constructor(
        private user_info: UserInfoService,
        private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    //logging the updated Parameters to browser's console
    const updatedRequest = request.clone({
      setHeaders: {
        Authorization: `${this.user_info.getToken()}`,
        'Content-Type': 'application/json',
        Accept: 'application/json;charset=UTF-8',
      },
    });
    return next.handle(updatedRequest).pipe(
      tap(
        (event) => {
          //logging the http response to browser's console in case of a success
        },
        (error) => {
          //logging the http response to browser's console in case of a failuer
          if (error.status === 401) {
            this.user_info.deleteToken();
            this.user_info.deleteUserInfo();
            this.router.navigate(['auth/login']);
          }
        }
      )
    );
  }
}
