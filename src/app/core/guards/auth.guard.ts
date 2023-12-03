import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';


export const requireAccount: CanActivateFn = (next, state) => {
    return inject(AuthService).isLoggedIn ? true : inject(Router).navigate(['/login']);
}

export const guestOnly: CanActivateFn = (next, state) => {
    return !inject(AuthService).isLoggedIn ? true : inject(Router).navigate(['/workspaces']);
}