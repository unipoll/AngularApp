import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { MaterialModule } from '../material/material.module';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';

// Shared components
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { PageLoadingSpinnerComponent } from 'src/app/shared/components/page-loading-spinner/page-loading-spinner.component';

// Workspace components
import { MemberListComponent } from './components/member-list/member-list.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { PollListComponent } from './components/poll-list/poll-list.component';

// Dialog components
import { DialogAddMemberComponent } from './components/dialog-add-member/dialog-add-member.component';
import { DialogRemoveMemberComponent } from './components/dialog-remove-member/dialog-remove-member.component';
import { DialogViewPolicyComponent } from './components/dialog-view-policy/dialog-view-policy.component';
import { DialogUpdatePolicyComponent } from './components/dialog-update-policy/dialog-update-policy.component';
import { DialogCreateGroupComponent } from './components/dialog-create-group/dialog-create-group.component';
import { DialogUpdateGroupComponent } from './components/dialog-update-group/dialog-update-group.component';
import { DialogDeleteGroupComponent } from './components/dialog-delete-group/dialog-delete-group.component';


@NgModule({
    declarations: [
        WorkspaceComponent,
        MemberListComponent,
        PolicyListComponent,
        GroupListComponent,
        PollListComponent,
        DialogAddMemberComponent,
        DialogRemoveMemberComponent,
        DialogUpdatePolicyComponent,
        DialogCreateGroupComponent,
        DialogUpdateGroupComponent,
        DialogDeleteGroupComponent,
        DialogViewPolicyComponent,
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
