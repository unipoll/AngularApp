import { Injectable, inject, Input } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { AuthorizationService } from '../services/authorization.service';
import { ApiService } from '../services/api.service';
import { lastValueFrom } from 'rxjs';


export const requireAccount: CanActivateFn = (next, state) => {
    return inject(AuthService).isLoggedIn ? true : inject(Router).createUrlTree(['/', 'login']);
}

export const guestOnly: CanActivateFn = (next, state) => {
    return !(inject(AuthService).isLoggedIn) ? true : inject(Router).createUrlTree(['/', 'workspaces']);
}


interface LoadPermissionsData {
    workspace_id?: string;
    group_id?: string;
    poll_id?: string;
}


async function loadPermissions(resource_type: string, data: LoadPermissionsData) {
    const apiService = inject(ApiService);
    const authorizationService = inject(AuthorizationService);

    const workspace_id = data.workspace_id as string;
    const group_id = data.group_id as string;
    const poll_id = data.poll_id as string;
    let response;

    if (resource_type == 'workspace') {
        response = await lastValueFrom(apiService.getWorkspaceMemberPermissions(workspace_id));
        authorizationService.setPermissions(workspace_id, response.permissions);
        return response.permissions;
    } else if (resource_type == 'group') {
        response = await lastValueFrom(apiService.getGroupMemberPermissions(workspace_id, group_id));
        authorizationService.setPermissions(group_id, response.permissions);
        return response.permissions;
    } else if (resource_type == 'poll') {
        response = await lastValueFrom(apiService.getPollMemberPermissions(workspace_id, poll_id));
        authorizationService.setPermissions(poll_id, response.permissions);
        return response.permissions;
    }
    return [];
}


export const requirePermission: (resource_type: string, permission: string) => CanActivateFn = (resource_type: string, permission: string) => {
    return async (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        let resource_id = next.params[`${resource_type}_id`];
        const authorizationService = inject(AuthorizationService);
        let permissions = authorizationService.getPermissions(resource_id);

        if (permissions.length == 0) {
            permissions = await loadPermissions(resource_type, next.params);
        }
        return permissions.includes(permission) ? true : inject(Router).createUrlTree(['/', 'workspaces']);
    }
}