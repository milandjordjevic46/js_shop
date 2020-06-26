import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../shared/services/user-info.service';
import { IsLoggedService } from '../shared/services/is-logged.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private userInfoService: UserInfoService,
    private isLoggedService: IsLoggedService
  ) {
    if (this.userInfoService.getUserInfo())
      this.isLoggedService.setLogged(true);

  }

  ngOnInit(): void {}
}
