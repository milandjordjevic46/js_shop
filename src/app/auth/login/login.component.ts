import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPresenter, LoginPresenterImpl } from './login.presenter';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { IsLoggedService } from 'src/app/shared/services/is-logged.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: LoginPresenter, useClass: LoginPresenterImpl }],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private loginPresenter: LoginPresenter,
    private snackBar: SnackBarService,
    private isLoggedService: IsLoggedService
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onLoginClicked() {
    this.loginPresenter
      .login(
        this.formGroup.get('email').value,
        this.formGroup.get('password').value
      )
      .subscribe(
        (res) => {},
        (err) => {
          this.snackBar.showErrorSnack(err.error.message);
        }
      );
  }
}
