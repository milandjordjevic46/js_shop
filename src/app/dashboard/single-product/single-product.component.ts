import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  SingleProductPresenterImpl,
  SingleProductPresenter,
} from './single-product.presenter';
import { SingleProduct } from 'src/app/shared/system-cloud/system-cloud.models';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [
    { provide: SingleProductPresenter, useClass: SingleProductPresenterImpl },
  ],
})
export class SingleProductComponent implements OnInit {
  productData: SingleProduct;
  constructor(
    private activatedRoute: ActivatedRoute,
    private singleProductPresenter: SingleProductPresenter,
    private snackBar: SnackBarService,
    private router: Router
  ) {
    this.activatedRoute.params
      .pipe(
        filter((params) => {
          return params.id;
        })
      )
      .subscribe((params) => {
        this.singleProductPresenter.getSingleProduct(params.id).subscribe(
          (res) => {
            this.productData = res;
          },
          (err) => {
            this.snackBar.showErrorSnack(err.error?.message);
            this.router.navigate(["/products"])
          }
        );
      });
  }

  ngOnInit(): void {}

  onClickAddToChart() {
    this.singleProductPresenter.addToChart(this.productData);
    this.snackBar.showSnack("Added to cart");
  }
}
