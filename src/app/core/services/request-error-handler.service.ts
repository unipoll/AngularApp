import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestErrorHandlerService implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                return next.handle(request).pipe(
            tap({
                // next: (event) => { }, 
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 401:
                                this.authService.logout();
                                this.router.navigate(['/login']);
                                break;
                            case 403:
                                this.router.navigate(['/unauthorized'], { state: { error: error.error}, skipLocationChange: true });
                                break;
                            case 404:
                                this.router.navigate(['/not-found'], { state: { error: error.error}, skipLocationChange: true });
                                break;
                            case 422:
                                console.log(error);
                                break;
                            default:
                                console.log(error);
                                break;
                        }
                    }
                }
            })
        );
    }
}
