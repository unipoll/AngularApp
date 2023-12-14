import { concatMap, lastValueFrom, switchMap, tap } from 'rxjs';
import { Location } from '@angular/common'; 
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { AccountService } from 'src/app/core/services/account.service';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { MemberListComponent } from '../member-list/member-list.component';
import { GroupListComponent } from '../group-list/group-list.component';
import { PolicyListModel } from 'src/app/models/policy.model';
import { MemberModel } from 'src/app/models/member.model';
import { ActivatedRoute } from '@angular/router';
import { PollListComponent } from '../poll-list/poll-list.component';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
    // Workspace data
    workspace!: WorkspaceModel;
    member!: MemberModel;

    @Input() workspace_id!: string;
    
    tab: string = 'polls';
    tabs: {[key: string]: number} = {
        'polls': 0,
        'policies': 1,
        'members': 2,
        'groups': 3
    }
    
    @ViewChild(GroupListComponent) groupList!: GroupListComponent;
    @ViewChild(MemberListComponent) memberList!: MemberListComponent;
    @ViewChild(PolicyListComponent) policyList!: PolicyListComponent;


    can_get_policies = false;
    can_get_groups = false;
    can_get_members = false;
    can_get_polls = false;

    // Constructor
    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private authService: AuthorizationService,
        private accountService: AccountService) { }

    // Get workspace data on init
    ngOnInit(): void {

        this.getWorkspace();

        this.activatedRoute.data.subscribe(data => {
            if (data['tab']) {
                this.tab = data['tab'];
            }
        });
    }

    // Get workspace data
    getWorkspace(): void {
        this.apiService.getWorkspace(this.workspace_id, true, true, true, true).subscribe(workspace => {
            workspace.members.forEach((member: MemberModel) => {
                if (member.account_id == this.accountService.getAccount().id) {
                    this.member = member;
                }
            });
            this.apiService.getAllMemberPermissions(this.member.id).subscribe(response => {
                this.authService.setPermissions(workspace.id, response.workspace.permissions);

                for (let group of response.groups) {
                    this.authService.setPermissions(group.id, group.permissions);
                }

                for (let poll of response.polls) {
                    this.authService.setPermissions(poll.id, poll.permissions);
                }

                this.can_get_policies = response.workspace.permissions.includes('get_policies');
                this.can_get_groups = response.workspace.permissions.includes('get_groups');
                this.can_get_members = response.workspace.permissions.includes('get_members');
                this.can_get_polls = response.workspace.permissions.includes('get_polls');

                this.workspace = workspace;  // Declare workspace after permissions are set
            });
        });
    }

    // isAllowed(permission: string): boolean {
    //     return this.authService.isAllowed(this.workspace_id, permission);
    // }

    // Handle Events
    eventHandler(event: any): void {
        console.log('Received event: ', event);
        switch (event) {
            // case 'updateGroupList':
            //     this.updateGroupList();
            //     break;
            // case 'updateMemberList':
            //     this.updateMemberList();
            //     break;
            case 'groupCreated':
                this.updatePolicyList();
                break;
            case 'groupDeleted':
                this.updatePolicyList();
                break;
            default:
                break;
        }
    }

    // Update Policy List
    updatePolicyList(): void {
        this.policyList.updatePolicyList();
    }

    // Update Member List
    onTabChange(event: any) {
        this.location.replaceState(`/workspaces/${this.workspace_id}/${event.tab.textLabel.toLowerCase()}`);
    }
}
