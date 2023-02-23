import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService) {
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
      tap((response: any) => {

        this._isLoggedIn$.next(true);
        localStorage.setItem('access_token', response.access_token);
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
