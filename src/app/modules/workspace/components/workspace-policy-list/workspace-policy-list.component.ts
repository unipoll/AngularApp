import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, tap } from 'rxjs';
import { GroupModel } from 'src/app/models/group.model';
import { MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
// import { WorkspaceService } from 'src/app/services/workspace.service';
// import { DialogAddMemberComponent } from '../dialogs/dialog-add-member/dialog-add-member.component';
// import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
import { PolicyListModel, PolicyModel, SetPolicyRequest, Permissions } from 'src/app/models/policy.model';
// import { DialogSetPolicyComponent } from '../dialogs/dialog-set-policy/dialog-set-policy.component';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
    selector: 'workspace-policy-list',
    templateUrl: './workspace-policy-list.component.html',
    styleUrls: ['./workspace-policy-list.component.scss']
})
export class WorkspacePolicyListComponent {
    @Input() workspace!: WorkspaceModel;
    @Input() policyList!: PolicyModel[];

    displayedColumns = ['name', 'permissions'];
    optionsMenu = [
		// {
		// 	label: 'View',
		// 	action: (workspace: WorkspaceModel) => this.getWorkspace(workspace)
		// },
		{
			label: 'Edit',
			action: (policy: PolicyModel) => this.editPolicy(policy)
		},
		// {
		// 	label: 'Delete',
		// 	action: (workspace: WorkspaceModel) => this.deleteWorkspace(workspace)
		// }
	]

    // Permissions
    public can_set_policies: boolean = false;

    // Timer for loading content
    private loading = true;
    private timer = timer(3000);
    userFlow!: boolean;

    constructor(
        private apiService: ApiService,
        private _dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
        this.timer.subscribe(val => {
            if (val == 0) {
                this.loading = false;
            }
        });

        this.policyList ? this.makeFullName(this.policyList) : this.updatePolicyList();
        this.can_set_policies = this.authService.isAllowed('update_policies');
    }

    updatePolicyList() {
        this.apiService.getWorkspacePolicies(this.workspace.id).pipe(
            tap((data: PolicyListModel) => (
                this.policyList = this.makeFullName(data.policies)
            ))
        ).subscribe();
    }

    makeFullName(policies: Array<PolicyModel>) {
        policies.forEach(policy => {
            if (policy.policy_holder_type == 'Member') {
                let policy_holder = policy.policy_holder as MemberModel;
                policy.name = policy_holder.first_name + ' ' + policy_holder.last_name;
            } else if (policy.policy_holder_type == 'Group') {
                let policy_holder = policy.policy_holder as GroupModel;
                policy.name = policy_holder.name;
            }
        });
        return policies;
    }

    // Getter for loading
    get isLoading(): boolean {
        return this.loading;
    }

    editPolicy(policyData: PolicyModel) {
        let dialogRef;

        console.log("Policy Data", policyData);

        /*
        this.apiService.getWorkspacePermissions().pipe(
            tap((allPermissions: Permissions) => (
                // console.log("All Permissions", allPermissions),
                dialogRef = this._dialog.open(DialogSetPolicyComponent, {
                    data: {
                        resource: {'workspace': this.workspace.id},
                        allPermissions: allPermissions.permissions,
                        policy: policyData
                    },
                }),
                console.log("Group Permissions", allPermissions),
                dialogRef.afterClosed().subscribe({
                    next: (val) => {
                        if (val) {
                            this.updatePolicyList();
                        }
                    },
                })
            ))
        ).subscribe();
        */

    }
}
