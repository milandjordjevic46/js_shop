import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductsPresenter, ProductsPresenterImpl } from './products.presenter';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { map, tap } from 'rxjs/operators';
import { SingleProductComponent } from '../single-product/single-product.component';
import { SingleProduct } from 'src/app/shared/system-cloud/system-cloud.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [{ provide: ProductsPresenter, useClass: ProductsPresenterImpl }],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products;
  orders: SingleProduct[];
  skip: number = 0;
  limit: number = 8;

  constructor(
    private productsPresenter: ProductsPresenter,
    private ordersService: OrdersService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getProducts(this.skip);
    this.ordersService.getOrders().subscribe((res) => {
      this.orders = res;
    });
  }

  getProducts(skip: number, limit?: number) {
    this.productsPresenter.getAllProducts(skip, limit | this.limit).subscribe(
      (res) => {
        this.products = res;
      },
      (err) => {
        this.snackBar.showErrorSnack(err.error?.message);
      }
    );
  }

  getServerData(e) {
    let skip = e.pageIndex * e.pageSize;
    this.getProducts(skip);
  }

  onClickOnProduct(id) {
    this.productsPresenter.seeDetails(id);
  }

  onClickAddToCart(product: SingleProduct) {
    const existingProduct = this.orders.find(
      (_product) => _product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      this.orders.push(product);
    }
    this.ordersService.setOrders(this.orders);
    this.snackBar.showSnack("Added to cart")
  }
}
