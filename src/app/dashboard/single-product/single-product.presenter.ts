import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { SingleProduct } from 'src/app/shared/system-cloud/system-cloud.models';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { map } from 'rxjs/operators';

export abstract class SingleProductPresenter {
  abstract getSingleProduct(id): Observable<SingleProduct>;
  abstract addToChart(product: SingleProduct): void;
}

@Injectable()
export class SingleProductPresenterImpl implements SingleProductPresenter {
  constructor(
    private dashboardService: DashboardService,
    private orderService: OrdersService
  ) {}

  getSingleProduct(id): Observable<SingleProduct> {
    return this.dashboardService.getSingleProduct(id);
  }

  addToChart(product: SingleProduct): void {
    let orders: SingleProduct[];
    this.orderService.getOrders().subscribe((_orders) => {
      orders = _orders;
    });
    const existProduct = orders.find((item) => item.id === product.id);
    if (existProduct) {
      orders.forEach((item) => {
        if (item.id === product.id) {
          item.quantity++;
        }
      });
    } else {
      product.quantity = 1;
      orders.push(product);
    }
    this.orderService.setOrders(orders);
  }
}
