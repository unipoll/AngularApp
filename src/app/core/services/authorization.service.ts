import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    private _permissions$ = new BehaviorSubject<string[]>([]);
    permissions$ = this._permissions$.asObservable();

    constructor() { }

    setPermissions(permissions: string[]) {
        // this.permissions = permissions;
        this._permissions$.next(permissions);
    }

    getPermissions() {
        return this._permissions$.value;
    }

    isAllowed(permission: string) {
        return this._permissions$.value.includes(permission);
    }
}
