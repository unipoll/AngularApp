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
import { PolicyListModel, PolicyModel, SetPolicyRequest, Permissions } from 'src/app/models/policy.model';
import { DialogEditPolicyComponent } from '../dialog-edit-policy/dialog-edit-policy.component';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Component({
    selector: 'policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent {
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

    constructor(
        private apiService: ApiService,
        private _dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {this.policyList ? this.makeFullName(this.policyList) : this.updatePolicyList();
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
    // get isLoading(): boolean {
    //     return this.loading;
    // }

    editPolicy(policyData: PolicyModel) {
        this.apiService.getWorkspacePermissions().pipe(
            tap((allPermissions: Permissions) => (
                this._dialog.open(DialogEditPolicyComponent, {
                    data: {
                        resource: {'workspace': this.workspace.id},
                        allPermissions: allPermissions.permissions,
                        policy: policyData
                    },
                }).afterClosed().subscribe({
                    next: (val) => {
                        if (val) {
                            this.updatePolicyList();
                        }
                    },
                })
            ))
        ).subscribe();
    }
}
