import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoService } from '../shared/services/user-info.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private user_info: UserInfoService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.user_info.getToken() || !this.user_info.getUserInfo()) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }
}
