import { concatMap, lastValueFrom, switchMap, tap } from 'rxjs';
import { Component, Input, ViewChild } from '@angular/core';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { AccountService } from 'src/app/core/services/account.service';
import { PolicyListComponent } from '../policy-list/policy-list.component';
import { MemberListComponent } from '../member-list/member-list.component';
import { GroupListComponent } from '../group-list/group-list.component';
import { PolicyListModel } from 'src/app/models/policy.model';
import { MemberModel } from 'src/app/models/member.model';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
    // Workspace data
    workspace!: WorkspaceModel;
    member!: MemberModel;
    // public permissions!: string[];

    // TODO: Make permissions an observable
    /* Update page on permission change
      i.e. On Load
      private _can_get_groups$ = new BehaviorSubject<boolean>(false);
      public can_get_groups$ = this._can_get_groups$.asObservable();
      ...
      On change:
      this._can_get_groups$.next(this.permissions.includes('get_groups'));
    */

    @Input() id!: string;
    
    @ViewChild(GroupListComponent) groupList!: GroupListComponent;
    @ViewChild(MemberListComponent) memberList!: MemberListComponent;
    @ViewChild(PolicyListComponent) policyList!: PolicyListComponent;

    // Constructor
    constructor(
        private apiService: ApiService,
        private authService: AuthorizationService,
        private accountService: AccountService) { }

    // Get workspace data on init
    ngOnInit(): void {
        this.getWorkspace();
    }

    // Get workspace data
    getWorkspace(): void {
        this.apiService.getWorkspace(this.id, true, true, true, true).subscribe(workspace => {
            workspace.members.forEach((member: MemberModel) => {
                if (member.account_id == this.accountService.getAccount().id) {
                    this.member = member;
                }
            });
            this.apiService.getPermissions(this.member.id, workspace.id).subscribe(permissions => {
                this.authService.setPermissions(permissions.permissions.workspace.permissions);
                this.workspace = workspace;  // Declare workspace after permissions are set
            });
        });
    }

    isAllowed(permission: string): boolean {
        return this.authService.isAllowed(permission);
    }


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
}
