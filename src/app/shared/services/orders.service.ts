import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SingleProduct } from '../system-cloud/system-cloud.models';

export abstract class OrdersService {
  abstract setOrders(order: SingleProduct[]);
  abstract getOrders(): Observable<SingleProduct[]>;
}

@Injectable()
export class OrdersServiceImpl implements OrdersService {
  constructor() {}

  orders: BehaviorSubject<SingleProduct[]> = new BehaviorSubject([]);

  setOrders(product:SingleProduct[]) {
    this.orders.next(product);
  }

  getOrders(): Observable<SingleProduct[]> {
    return this.orders.asObservable();
  }
}
