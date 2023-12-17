import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { requireAccount, requirePermission, guestOnly } from './core/guards/auth.guard';

import { UnauthorizedComponent } from './core/components/errors/unauthorized/unauthorized.component';
import { NotFoundComponent } from './core/components/errors/not-found/not-found.component';

const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
        canActivate: [guestOnly] 
    },
    {
        path: 'register',
        pathMatch: 'full',
        loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
        canActivate: [guestOnly]
    },
    {
        path: 'workspaces/:workspace_id/polls/:poll_id/edit',
        pathMatch: 'full',
        loadChildren: () => import('./modules/poll-editor/poll-editor.module').then(m => m.PollEditorModule),
        canActivate: [requireAccount, requirePermission('poll', 'update_poll')],
    },
    {
        path: 'workspaces/:workspace_id/polls/:poll_id',
        pathMatch: 'full',
        loadChildren: () => import('./modules/poll/poll.module').then(m => m.PollModule),
        canActivate: [requireAccount]
    },
    {
        path: 'workspaces/:workspace_id/groups/:group_id',
        pathMatch: 'prefix',
        loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule),
        canActivate: [requireAccount]
    },
    {
        path: 'workspaces/:workspace_id',
        // pathMatch: 'full',
        pathMatch: 'prefix',
        loadChildren: () => import('./modules/workspace/workspace.module').then(m => m.WorkspaceModule),
        canActivate: [requireAccount]
    },
    {
        path: 'workspaces',
        pathMatch: 'full',
        loadChildren: () => import('./modules/workspace-list/workspace-list.module').then(m => m.WorkspaceListModule),
        canActivate: [requireAccount],
    },
    {
        path: '',
        redirectTo: 'workspaces',
        pathMatch: 'full'
    },
    {
        path: 'unauthorized',
        pathMatch: 'full',
        component: UnauthorizedComponent
    },
    {
        path: 'not-found',
        pathMatch: 'full',
        component: NotFoundComponent
    },
    {
        path: '**',
        // redirectTo: 'not-found',
        pathMatch: 'full',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
