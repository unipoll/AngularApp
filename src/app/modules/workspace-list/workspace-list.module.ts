import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { WorkspaceListRoutingModule } from './workspace-list-routing.module';

import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';

import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';

import { DialogCreateWorkspaceComponent } from './components/dialog-create-workspace/dialog-create-workspace.component';
import { DialogUpdateWorkspaceComponent } from './components/dialog-update-workspace/dialog-update-workspace.component';
import { DialogDeleteWorkspaceComponent } from './components/dialog-delete-workspace/dialog-delete-workspace.component';
import { PageLoadingSpinnerComponent } from 'src/app/shared/components/page-loading-spinner/page-loading-spinner.component';




@NgModule({
    declarations: [
        WorkspaceListComponent,
        DialogCreateWorkspaceComponent,
        DialogUpdateWorkspaceComponent,
        DialogDeleteWorkspaceComponent
    ],
    imports: [
        CommonModule, 
        MaterialModule,
        DialogComponent,
        GridOrTableViewComponent,
        WorkspaceListRoutingModule,
        PageLoadingSpinnerComponent
    ],
    exports: [
        WorkspaceListComponent
    ]
})
export class WorkspaceListModule { }
