import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Products,
  SingleProduct,
  User,
  Orders,
} from '../shared/system-cloud/system-cloud.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfoService } from '../shared/services/user-info.service';

export abstract class DashboardService {
  abstract getAllProducts(skip: number, limit: number): Observable<Products>;
  abstract getSingleProduct(id: string): Observable<SingleProduct>;
  abstract getOrdersHystory(skip: number, limit: number): Observable<Orders[]>;
  abstract setOrders(body: {}): Observable<any>;
}

@Injectable()
export class DashboardServiceImpl implements DashboardService {
  constructor(
    private http: HttpClient,
    private userInfoService: UserInfoService
  ) {}

  getAllProducts(skip: number, limit: number): Observable<Products> {
    let params = new HttpParams();
    params = params.append('skip', skip.toString());
    params = params.append('limit', limit.toString());
    return this.http.get<Products>(environment.apiUrl + 'products', {
      params: params,
    });
  }

  getSingleProduct(id): Observable<SingleProduct> {
    return this.http.get<SingleProduct>(environment.apiUrl + 'products/' + id);
  }

  getOrdersHystory(skip, limit):Observable<Orders[]> {
    const user: User = JSON.parse(this.userInfoService.getUserInfo());
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    return this.http.get<Orders[]>(environment.apiUrl + user.id + '/orders', {
      params: params,
    });
  }

  setOrders(body: {}) {
    const user: User = JSON.parse(this.userInfoService.getUserInfo());
    return this.http.post(
      environment.apiUrl + 'users/' + user.id + '/orders',
      body
    );
  }
}
