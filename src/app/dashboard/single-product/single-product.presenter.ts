import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../dashboard.service';

export abstract class SingleProductPresenter {
    abstract getSingleProduct(id): Observable<any>;
}

@Injectable()
export class SingleProductPresenterImpl implements SingleProductPresenter {
  constructor(private dashboardService: DashboardService) {
  
}
  getSingleProduct(id) {
    return this.dashboardService.getSingleProduct(id);
    }
}
