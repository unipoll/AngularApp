import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const request = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        return next.handle(request).pipe(
            tap({
                // next: (event) => { }, 
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            this.authService.logout();
                            // console.log('Unauthorized');
                            this.router.navigate(['/login']);
                        }
                    }
                }
            })
        );
    }
}
