import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    // private _permissions$ = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>());
    // permissions$ = this._permissions$.asObservable();
    permissions = new Map<string, string[]>();

    constructor() { }

    setPermissions(resource_id: string, permissions: string[]) {
        // this.permissions = permissions;
        // this._permissions$.next(permissions);

        this.permissions.set(resource_id, permissions);
    }

    getPermissions(resource_id: string) {
        return this.permissions.get(resource_id) || [];
    }

    isAllowed(resource_id: string, permission: string): boolean {
        return this.permissions.get(resource_id)?.includes(permission) || false;
    }
}
