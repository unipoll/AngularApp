import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { AccountService } from 'src/app/core/services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(private apiService: ApiService, 
                private snackBarService: SnackBarService,
                private accountService: AccountService) {
        const token = localStorage.getItem('access_token');
        this._isLoggedIn$.next(!!token);
    }

    public get isLoggedIn(): boolean {
        return this._isLoggedIn$.value;
    }

    login(username: string, password: string) {
        if (this.isLoggedIn) {
            throw 'Already logged in';
        }
        return this.apiService.login(username, password).pipe(
            catchError((error) => {
                switch (error.status) {
                    case 400:
                        this.snackBarService.openSnackBar('Invalid username or password', 'Close', 'error');
                        break;
                    case 500:
                        this.snackBarService.openSnackBar('Internal server error', 'Close', 'error');
                        break;
                    default:
                        this.snackBarService.openSnackBar('Unknown error', 'Close', 'error');
                        break;
                }
                throw error;
            }),
            tap((response: any) => {
                this._isLoggedIn$.next(true);
                localStorage.setItem('access_token', response.body.access_token);
                this.accountService.loadAccount();
            })
        );
    }

    logout() {
        if (!this.isLoggedIn) {
            throw 'Not logged in';
        }
        this._isLoggedIn$.next(false);
        localStorage.removeItem('access_token');
    }
}
