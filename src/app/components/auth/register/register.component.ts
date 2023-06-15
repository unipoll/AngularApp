import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private apiService: ApiService) {
    this.form = this.fb.group({
      first_name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*')
        ]
      }],
      last_name: ['', {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*')]
      }],
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator()
        ]
      }
      ],
      confirm_password: ['', Validators.required]
    }, { validator: ConfirmedValidator })


  };

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/workspaces']);
      return;
    }
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirm_password() {
    return this.form.controls['confirm_password'];
  }

  get form_control() {
    return this.form.controls;
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    this.apiService.register(
      this.form
    ).subscribe((response) => {
      if (response.status === 201) {
        this.router.navigate(['/login']);
      } else {
        console.log(response.error);
      }
    });
  }
}

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? { passwordStrength: true } : null;
  }
}

export function ConfirmedValidator(control: AbstractControl) {
  return (control.get('password')?.value === control.get('confirm_password')?.value) ? null : { 'nomatch': true };
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if (!control || !form)
      return false;

    if (control.dirty || control.touched || isSubmitted)
      return !!(control.invalid || form.hasError('nomatch'));
    else
      return false;
    // return form?.hasError('nomatch') ? true : false;
  }
}
