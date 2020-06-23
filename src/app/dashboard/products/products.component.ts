import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsPresenter, ProductsPresenterImpl } from './products.presenter';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [{ provide: ProductsPresenter, useClass: ProductsPresenterImpl }],
})
export class ProductsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  products;
  skip: number = 0;
  limit: number = 8;

  constructor(private productsPresenter: ProductsPresenter) {}

  ngOnInit(): void {
    this.getProducts(this.skip);
  }
  
  getProducts(skip, limit?) {
    this.productsPresenter.getAllProducts(skip, limit | this.limit).subscribe((res) => {
      this.products = res;
    });
  }

  getServerData(e) {
    console.log(e)
    let skip = e.pageIndex * e.pageSize;
    this.getProducts(skip);
  }

  onClickOnProduct(id) {
    this.productsPresenter.seeDetails(id);
  }

}
