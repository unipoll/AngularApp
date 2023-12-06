import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MaterialModule } from '../material/material.module';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';

import { MemberListComponent } from './components/member-list/member-list.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

import { DialogAddMemberComponent } from './components/dialog-add-member/dialog-add-member.component';
import { DialogRemoveMemberComponent } from './components/dialog-remove-member/dialog-remove-member.component';
import { DialogEditPolicyComponent } from './components/dialog-edit-policy/dialog-edit-policy.component';

import { PageLoadingSpinnerComponent } from 'src/app/shared/components/page-loading-spinner/page-loading-spinner.component';

@NgModule({
    declarations: [
        WorkspaceComponent,
        MemberListComponent,
        PolicyListComponent,
        DialogAddMemberComponent,
        DialogRemoveMemberComponent,
        DialogEditPolicyComponent
    ],
    imports: [
        CommonModule,
        WorkspaceRoutingModule,
        MaterialModule,
        GridOrTableViewComponent,
        DialogComponent,
        PageLoadingSpinnerComponent
    ],
    exports: [
        WorkspaceComponent
    ]
})
export class WorkspaceModule { }
