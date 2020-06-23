import { Injectable } from '@angular/core';
import { Products } from '../../shared/system-cloud/system-cloud.models';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export abstract class ProductsPresenter {
  abstract getAllProducts(skip:number, limit:number): Observable<Products>;
  abstract seeDetails(id: string): void;
}

@Injectable()
export class ProductsPresenterImpl implements ProductsPresenter {
  constructor(private dashboardService: DashboardService, private router: Router) {}
  
  getAllProducts(skip, limit): Observable<Products> {
    return this.dashboardService.getAllProducts(skip, limit);
  }
  
  seeDetails(id): void{
    this.router.navigate(["/products", id])
  }
}
