import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { GroupModel } from 'src/app/models/group.model';
import { MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
import { PolicyListModel, PolicyModel, SetPolicyRequest, Permissions } from 'src/app/models/policy.model';
import { DialogUpdatePolicyComponent } from '../dialog-update-policy/dialog-update-policy.component'
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';
import { DialogViewPolicyComponent } from '../dialog-view-policy/dialog-view-policy.component';
import { PollModel } from 'src/app/models/poll.model';

@Component({
    selector: 'policy-list',
    templateUrl: './policy-list.component.html',
    styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit {
    @Input() workspace!: WorkspaceModel;
    @Input() poll!: PollModel;
    @Input() policyList!: PolicyModel[];

    @ViewChild(GridOrTableViewComponent) gridOrTableViewComponent!: GridOrTableViewComponent;

    // Permissions
    can_update_policies: boolean = false;

    // Template data
    displayedColumns = ['name', 'permissions', 'policy_holder_type'];
    optionsMenu: {label: string, action: (policy: PolicyModel) => void}[] = [
		{
			label: 'View',
			action: (policy: PolicyModel) => this.viewPolicy(policy)
		}
		// {
		// 	label: 'Delete',
		// 	action: (workspace: WorkspaceModel) => this.deleteWorkspace(workspace)
		// }
	];  

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
        this.policyList ? this.formatList(this.policyList) : this.updatePolicyList();
        this.can_update_policies = this.authService.isAllowed(this.poll.id, 'update_policies');
        
        if (this.can_update_policies) {
            this.optionsMenu.push({
                label: 'Edit Policy',
                action: (policy: PolicyModel) => this.editPolicy(policy)
            })
        }
    }

    updatePolicyList() {
        this.apiService.getWorkspacePolicies(this.workspace.id).pipe(
            tap({
                next: (data: PolicyListModel) => {
                    console.log("Updating policy list...");
                    this.policyList = this.formatList(data.policies);
                    this.gridOrTableViewComponent.updateList(this.policyList);
                },
                error: (err) => console.log(err)

        })).subscribe();
    }

    formatList(policies: PolicyModel[]) {
        policies.forEach(policy => this.makeFullName(policy));
        return policies;
    }

    makeFullName(policy: PolicyModel) {
        if (policy.policy_holder_type == 'Member') {
            let policy_holder = policy.policy_holder as MemberModel;
            policy.name = policy_holder.first_name + ' ' + policy_holder.last_name;
        } else if (policy.policy_holder_type == 'Group') {
            let policy_holder = policy.policy_holder as GroupModel;
            policy.name = policy_holder.name;
        }
        return policy;
    }

    viewPolicy(policy: PolicyModel) {
        this.dialog.open(DialogViewPolicyComponent, {
            data: {
                policy: policy
            },
        });
    }

    editPolicy(policyData: PolicyModel) {
        this.apiService.getWorkspacePermissions().pipe(
            tap((allPermissions: Permissions) => (
                this.dialog.open(DialogUpdatePolicyComponent, {
                    data: {
                        workspace: this.workspace,
                        allPermissions: allPermissions.permissions,
                        policy: policyData
                    },
                }).afterClosed().subscribe({
                    next: (permissionsList) => {
                        if (permissionsList) {
                            this.policyList[this.policyList.indexOf(policyData)].permissions = permissionsList.permissions;
                            this.gridOrTableViewComponent.updateList(this.policyList);
                            // this.updatePolicyList();

                        }
                    },
                })
            ))
        ).subscribe();
    }
}
