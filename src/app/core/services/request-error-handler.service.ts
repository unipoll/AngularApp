import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequestErrorHandlerService implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                // next: (event) => { }, 
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 403:
                                this.router.navigate(['/unauthorized']);
                                break;
                            case 404:
                                console.log("404 error");
                                // Pass data to the not-found component
                                this.router.navigate(['/not-found'], { state: { error: error.error} });
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
