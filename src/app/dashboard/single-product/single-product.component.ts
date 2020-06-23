import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SingleProductPresenterImpl, SingleProductPresenter } from './single-product.presenter';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [{ provide: SingleProductPresenter, useClass: SingleProductPresenterImpl }]
})
export class SingleProductComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private singleProductPresenter: SingleProductPresenter) { 
    this.activatedRoute.queryParams
      .pipe(
        filter(params => {
            return params.id;
          }
        )
      )
      .subscribe(params => {
        this.singleProductPresenter.getSingleProduct(params)
      });
  }

  ngOnInit(): void {
    console.log('radi')
  }

}
