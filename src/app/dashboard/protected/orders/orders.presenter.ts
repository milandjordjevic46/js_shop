import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../dashboard.service';
import { Orders } from 'src/app/shared/system-cloud/system-cloud.models';
import { Observable } from 'rxjs';

export abstract class OrdersPresenter {
  abstract getOrdersHystory(skip: number, limit: number);
}

@Injectable()
export class OrdersPresenterImpl implements OrdersPresenter {
  constructor(private dasboardService: DashboardService) {}

  getOrdersHystory(skip: number, limit: number){
    return this.dasboardService.getOrdersHystory(skip, limit);
  }
}
