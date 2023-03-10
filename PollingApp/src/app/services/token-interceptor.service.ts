import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return next.handle(request).pipe(
      tap(event => {},err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logout();
            console.log('Unauthorized');
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }
}
