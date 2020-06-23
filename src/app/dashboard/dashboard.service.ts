import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from '../shared/system-cloud/system-cloud.models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

export abstract class DashboardService {
  abstract getAllProducts(skip: number, limit: number): Observable<Products>;
  abstract getSingleProduct(id: string): Observable<any>;
}

@Injectable()
export class DashboardServiceImpl implements DashboardService{

  constructor(private http: HttpClient) { }

  getAllProducts(skip, limit): Observable<Products>{
    let params = new HttpParams();
    params = params.append('skip', skip);
    params = params.append('limit', limit);
    return this.http.get<Products>(environment.apiUrl + 'products', {params: params});
  }

  getSingleProduct(id): Observable<any>{
    let params = new HttpParams();
    params = params.append('productId', id);
    return this.http.get<Products>(environment.apiUrl + 'products/', {params: params});
  }
}
