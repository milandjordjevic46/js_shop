import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnack(message: string, action?: string) {
    this.snackBar.open(message, action || 'OK', {
      duration: 2000,
    });
  }

  showErrorSnack(message: string) {
    this.snackBar.open(message || 'Something went wrong. Try again', 'OK', {
      duration: 2000,
    });
  }
}
