import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GroupModel } from 'src/app/models/group.model';
import { MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { MemberListComponent } from '../member-list/member-list.component';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
    selector: 'app-group-page',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent {

    @Input() workspace_id!: WorkspaceModel;
    @Input() group_id!: string;

    workspace!: WorkspaceModel;
    group!: GroupModel;
    member!: MemberModel;

    tab: string = 'polls';
    tabs: { [key: string]: number } = {
        'members': 0,
        'policies': 1
    }

    @ViewChild(MemberListComponent) memberList!: MemberListComponent;
    @ViewChild(PolicyListComponent) policyList!: PolicyListComponent;

    constructor(
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private apiService: ApiService,
        private accountService: AccountService,
        private authService: AuthorizationService) {
    }

    ngOnInit(): void {
        this.getGroup();

        this.activatedRoute.data.subscribe(data => {
            if (data['tab']) {
                this.tab = data['tab'];
            }
        });
    }

    getGroup(): void {
        this.apiService.getGroup(this.group_id, true, true).subscribe(group => {
            // console.log('group members: ', group.members);
            // group.members.forEach((member: MemberModel) => {
            //     if (member.account_id == this.accountService.getAccount().id) {
            //         this.member = member;
            //     }
            // });
            // this.apiService.getPermissions(this.member.id).subscribe(permissions => {
            //     for (let group of permissions.permissions.groups) {
            //         if (group.id == this.group_id) {
            //             this.authService.setPermissions(group.permissions);
            //         }
            //         this.group = group;
            // });
            // this.authService.getPermissions()

            this.apiService.getGroupMemberPermissions(group.workspace.id, group.id).subscribe(response => {
                    this.authService.setPermissions(group.id, response.permissions);
                    this.group = group;
                    this.workspace = group.workspace;
            });
        });
    }

    // Handle Events
    eventHandler(event: any): void {
        switch (event) {
            // case 'updateGroupList':
            //     this.updateGroupList();
            //     break;
            // case 'updateMemberList':
            //     this.updateMemberList();
            //     break;
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
        this.location.replaceState(`/workspaces/${this.workspace_id}/groups/${this.group_id}/${event.tab.textLabel.toLowerCase()}`);
    }
}
