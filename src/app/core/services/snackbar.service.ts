import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'ok', color: string = 'success') {
    this.snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
      panelClass: 'app-notification-' + color,
    });
  }
}
