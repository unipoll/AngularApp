import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MaterialModule } from '../material/material.module';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';

import { WorkspacePolicyListComponent } from './components/workspace-policy-list/workspace-policy-list.component';


@NgModule({
    declarations: [
        WorkspaceComponent,
        WorkspacePolicyListComponent,
    ],
    imports: [
        CommonModule,
        WorkspaceRoutingModule,
        MaterialModule,
        GridOrTableViewComponent
    ],
    exports: [
        WorkspaceComponent,
        WorkspacePolicyListComponent
    ]
})
export class WorkspaceModule { }
