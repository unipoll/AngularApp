import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
// import { AuthService } from '@app/services/auth.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/workspaces']);
      return;
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(
      this.form.get('username')?.value!,
      this.form.get('password')?.value!
    ).subscribe((response) => {
      if (response.status == 200) {
        this.snackBarService.openSnackBar('Logged in successfully');
        this.router.navigate(['/workspaces']);
      }
    });
  }

  goToSignUp() {
    this.router.navigate(['/register']);
  }
}
