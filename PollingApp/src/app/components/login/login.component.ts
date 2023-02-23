import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {
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
      this.router.navigate(['/workspaces']);
    });
  }
}
