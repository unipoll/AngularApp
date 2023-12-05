import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap, timer } from 'rxjs';
import { MemberModel, MemberListModel } from 'src/app/models/member.model';
import { ApiService } from 'src/app/core/services/api.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceService } from '../../services/workspace.service'
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { DialogAddWorkspaceMemberComponent } from '../dialog-add-workspace-member/dialog-add-workspace-member.component';
// import { AccountListModel, AccountModel } from '../../models/account.model'
// import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'workspace-member-list',
    templateUrl: './workspace-member-list.component.html',
    styleUrls: ['./workspace-member-list.component.scss']
})
export class WorkspaceMemberListComponent implements OnInit {
    @Input() workspace!: WorkspaceModel;
    @Input() memberList!: MemberModel[];

    private accountList!: MemberModel[];

    displayedColumns = ['full_name', 'email'];
    optionsMenu = [
        {
            label: 'Remove Member',
            action: (member: MemberModel) => this.removeMember(member)
        },
    ]
    

    // Permissions
    public can_add_members: boolean = false;

    // Timer for loading content
    private loading = true;
    private timer = timer(3000);
    userFlow!: boolean;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
        this.timer.subscribe(val => {
            if (val == 0) {
                this.loading = false;
            }
        });

        this.apiService.getAllAccounts().pipe(
            tap((data) => (
                this.accountList = data.accounts
            ))
        ).subscribe();

        this.memberList ? this.makeFullName(this.memberList) : this.updateMemberList();
        this.can_add_members = this.authService.isAllowed('add_members');
    }

    updateMemberList() {
        this.apiService.getWorkspaceMembers(this.workspace.id).pipe(
            tap((data) => (
                this.memberList = this.makeFullName(data.members)
            ))
        ).subscribe();
    }

    makeFullName(members: Array<MemberModel>) {
        members.forEach(member => {
            member.full_name = member.first_name + ' ' + member.last_name;
        });
        return members;
    }

    // Getter for loading
    get isLoading(): boolean {
        return this.loading;
    }

    // Add member
    addMember() {
        console.log('Member List', this.memberList);
        console.log('Account List', this.accountList);
        const dialogRef = this.dialog.open(DialogAddWorkspaceMemberComponent, {
            data: {
                accountList: this.accountList,
                memberList: this.memberList,
                resource: {
                    type: 'workspace',
                    id: this.workspace.id,
                }
            }
        });
        
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val) {
                    // this.updateMemberList();
                    return val;
                }
            },
        });
    }

    removeMember(member: MemberModel) {
        console.log('Remove Member', member);
        // const dialogRef = this._dialog.open(DialogDeleteComponent, {
        //     data: {
        //         resourceType: 'member',
        //         resourceID: member.id,
        //         resourceName: member.first_name + ' ' + member.last_name,
        //         parentResourceType: 'workspace',
        //         parentResourceID: this.workspace.id,
        //         parentResourceName: this.workspace.name,
        //     }
        // });

        // dialogRef.afterClosed().subscribe({
        //     next: (val) => {
        //         if (val) {
        //             this.updateMemberList();
        //         }
        //     },
        // });
    }
}
