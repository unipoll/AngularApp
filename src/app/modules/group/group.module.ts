import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { GroupRoutingModule } from './group-routing.module';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { DialogViewPolicyComponent } from './components/dialog-view-policy/dialog-view-policy.component';
import { DialogUpdatePolicyComponent } from './components/dialog-update-policy/dialog-update-policy.component';
import { DialogAddMemberComponent } from './components/dialog-add-member/dialog-add-member.component';
import { DialogRemoveMemberComponent } from './components/dialog-remove-member/dialog-remove-member.component';
import { GroupComponent } from './components/group/group.component';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';
import { PageLoadingSpinnerComponent } from 'src/app/shared/components/page-loading-spinner/page-loading-spinner.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';


@NgModule({
    declarations: [
        GroupComponent,
        PolicyListComponent,
        MemberListComponent,
        DialogViewPolicyComponent,
        DialogUpdatePolicyComponent,
        DialogAddMemberComponent,
        DialogRemoveMemberComponent
    ],
    imports: [
        CommonModule,
        GroupRoutingModule,
        MaterialModule,
        GridOrTableViewComponent,
        PageLoadingSpinnerComponent,
        DialogComponent
    ],
    exports: [
        GroupComponent
    ]
})
export class GroupModule { }
