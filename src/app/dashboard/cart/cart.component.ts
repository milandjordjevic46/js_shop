import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { SingleProduct } from 'src/app/shared/system-cloud/system-cloud.models';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../dashboard.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IsLoggedService } from 'src/app/shared/services/is-logged.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  orders: SingleProduct[];
  logged: boolean;
  whatToShow: 'loader' | 'empty' | 'products' | 'success' | 'error' = 'loader';
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'clearAll',
  ];
  dataSource = new MatTableDataSource<SingleProduct>(this.orders);

  constructor(
    private ordersService: OrdersService,
    private dashboardService: DashboardService,
    private snackBar: SnackBarService,
    private isLoggedService: IsLoggedService
  ) {
    this.ordersService.getOrders().subscribe((res) => {
      this.orders = res;
      this.setWhatToShow(res.length ? 'products' : 'empty');
      this.refreshTable(this.orders);
    });
    this.isLoggedService.getLogged().subscribe((res) => (this.logged = res));
  }

  ngOnInit(): void {}

  calculateAll(): number {
    return this.orders.reduce(
      (acc, value) => acc + value.quantity * value.price,
      0
    );
  }

  clearAll(): void {
    this.ordersService.setOrders([]);
    this.snackBar.showSnack('Cart is empty');
  }

  clearSelected(product: SingleProduct): void {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      let indexOfProduct = this.orders.findIndex(
        (item) => item.id == product.id
      );
      this.orders.splice(indexOfProduct, 1);
    }
    this.ordersService.setOrders(this.orders);
    this.refreshTable(this.orders);
    this.snackBar.showSnack('Removed from cart');
  }

  refreshTable(orders: SingleProduct[]): void {
    this.dataSource = new MatTableDataSource(orders);
  }

  submitOrder(): void {
    let obj = {};
    this.orders.forEach((item) => {
      obj[item.id] = item.quantity;
    });
    this.dashboardService.setOrders(obj).subscribe(
      (res) => {
        console.log('wow, radi');
        this.ordersService.setOrders([]);
        this.setWhatToShow('success');
      },
      (err) => {
        this.setWhatToShow('error');
        this.snackBar.showErrorSnack(err.error?.message);
      }
    );
  }

  setWhatToShow(what): void {
    this.whatToShow = what;
  }
}
