import { Component, OnInit } from '@angular/core';
import { IsLoggedService } from '../../services/is-logged.service';
import {
  User,
  Products,
  SingleProduct,
} from '../../system-cloud/system-cloud.models';
import { UserInfoService } from '../../services/user-info.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  logged: boolean;
  user: User;
  orders: SingleProduct[];
  constructor(
    private isLoggedService: IsLoggedService,
    private userInfoService: UserInfoService,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.isLoggedService.getLogged().subscribe((res) => (this.logged = res));
    this.ordersService.getOrders().subscribe((res) => (this.orders = res));

    this.user = JSON.parse(this.userInfoService.getUserInfo());
  }

  ngOnInit(): void {}

  totalOrdersSum(): number {
    return this.orders.reduce((tot, arr) => tot + arr.price * arr.quantity, 0);
  }

  getNumberOfOrders(): number {
    let numOfOrders = 0;
    this.orders.map((item) => {
      numOfOrders += item.quantity;
    });
    return numOfOrders;
  }

  logout(): void {
    this.userInfoService.deleteToken();
    this.userInfoService.deleteUserInfo();
    this.isLoggedService.setLogged(false);
    this.router.navigate(['home']);
  }
}
