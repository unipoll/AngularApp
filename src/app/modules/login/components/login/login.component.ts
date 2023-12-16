import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
// import { AuthService } from '@app/services/auth.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
    matcher = new MyErrorStateMatcher();
    form: FormGroup = new FormGroup({});
    field_appearance = 'outline' as MatFormFieldAppearance;

    constructor(private authService: AuthService, private router: Router, private snackBarService: SnackBarService) {
        this.form = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required
            ])
        });
    }

    get email() {
        return this.form.get('email');
    }

    get password() {
        return this.form.get('password');
    }

    submitForm() {
        if (this.form.invalid) {
            return;
        }

        this.authService.login(
            this.form.get('email')?.value!,
            this.form.get('password')?.value!
        ).subscribe({
            next: (response) => {
                if (response.status == 200) {
                    this.snackBarService.openSnackBar('Logged in successfully');
                    this.router.navigate(['/']);
                }
            },
            error: (error) => {
                if (error.status == 400) {
                    this.form.setErrors({ wrongCredentials: true });
                }
            }
        });
    }

    goToSignUp() {
        this.router.navigate(['/register']);
    }
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        if (!control || !form)
            return false;

        if (form.hasError('wrongCredentials'))
            return true;

        if (control.dirty || control.touched || isSubmitted)
            return !!(control.invalid);

        return false;
    }
}
