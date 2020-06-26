import { Component, OnInit } from '@angular/core';
import { OrdersPresenter, OrdersPresenterImpl } from './orders.presenter';
import { Orders, Order } from 'src/app/shared/system-cloud/system-cloud.models';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [{ provide: OrdersPresenter, useClass: OrdersPresenterImpl }],
})
export class OrdersComponent implements OnInit {
  orders: Orders;
  skip: number = 0;
  limit: number = 10;
  displayedColumns: string[] = ['id', 'createdAt', 'items', 'total'];
  dataSource = new MatTableDataSource<Order>(this.orders?.orders);

  constructor(
    private ordersPresenter: OrdersPresenter,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getOrders(this.skip);
  }

  getOrders(skip: number, limit?: number) {
    this.ordersPresenter.getOrdersHystory(skip, limit | this.limit).subscribe(
      (res) => {
        this.orders = res;
        this.dataSource = new MatTableDataSource(this.orders.orders);
      },
      (err) => {
        this.snackBar.showErrorSnack(err.error?.message);
      }
    );
  }

  getServerData(e): void {
    let skip = e.pageIndex * e.pageSize;
    this.getOrders(skip);
  }

  getNumberOfItems(element: Order): number {
    return element.products.length;
  }
}
