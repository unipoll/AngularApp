import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { requireAccount } from './core/guards/auth.guard';

const routes: Routes = [

    // { path: '**', redirectTo: '', pathMatch: 'full' }

    {
        path: 'workspaces/:workspace_id/polls/:poll_id/edit',
        pathMatch: 'full',
        loadChildren: () => import('./modules/poll-editor/poll-editor.module').then(m => m.PollEditorModule),
        canActivate: [requireAccount],
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
        // pathMatch: 'full',
        loadChildren: () => import('./modules/workspace-list/workspace-list.module').then(m => m.WorkspaceListModule),
        canActivate: [requireAccount],
    },
    {
        path: '',
        redirectTo: 'workspaces',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
