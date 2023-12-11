import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PollListComponent } from './components/poll-list/poll-list.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';


const routes: Routes = [
    {
        path: 'polls',
        component: WorkspaceComponent,
        data: {
            tab: 'polls'
        }
    },
    {
        path: 'policies',
        component: WorkspaceComponent,
        data: {
            tab: 'policies',
        },
    },
    {
        path: 'members',
        component: WorkspaceComponent,
        data: {
            tab: 'members'
        }
    },
    {
        path: 'groups',
        component: WorkspaceComponent,
        data: {
            tab: 'groups'
        }
    },
    {
        path: '',
        component: WorkspaceComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
