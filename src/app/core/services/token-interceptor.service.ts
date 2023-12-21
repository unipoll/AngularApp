import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor {

    _token = new BehaviorSubject<string>('');

    constructor(private router: Router) {
        this._token.next(localStorage.getItem('access_token') || '');
    }

    get token(): string {
        return this._token.value;
    }

    set token(value: string) {
        this._token.next(value);
        localStorage.setItem('access_token', value);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._token ? this._token.value : localStorage.getItem('access_token');
        const request = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(request);
    }
}
