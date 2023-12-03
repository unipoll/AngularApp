import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { requireAccount } from './core/guards/auth.guard';

const routes: Routes = [

    // { path: '**', redirectTo: '', pathMatch: 'full' }

    {
        path: '',
        redirectTo: 'workspaces',
        pathMatch: 'full'
    },
    {
        path: 'workspaces',
        pathMatch: 'full',
        loadChildren: () => import('./modules/workspace-list/workspace-list.module').then(m => m.WorkspaceListModule),
        canActivate: [requireAccount],
    },
    {
        path: 'workspaces/:id',
        pathMatch: 'full',
        loadChildren: () => import('./modules/workspace/workspace.module').then(m => m.WorkspaceModule),
        canActivate: [requireAccount]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
