import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { tap, timer } from 'rxjs';
import { MemberModel } from 'src/app/models/member.model';
import { ApiService } from 'src/app/core/services/api.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { DialogAddMemberComponent } from '../dialog-add-member/dialog-add-member.component';
import { DialogRemoveMemberComponent } from '../dialog-remove-member/dialog-remove-member.component';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';


@Component({
    selector: 'member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
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

    @ViewChild(GridOrTableViewComponent) gridOrTableViewComponent!: GridOrTableViewComponent;

    // Permissions
    public can_add_members: boolean = false;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
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

    // Add member
    addMember() {
        this.dialog.open(DialogAddMemberComponent, {
            data: {
                accountList: this.accountList,
                memberList: this.memberList,
                workspace: this.workspace
            }
        }).afterClosed().subscribe({
            next: (val: any) => {
                if (val) {
                    // this.updateMemberList();
                    this.memberList = this.memberList.concat(this.makeFullName(val.members));
					this.gridOrTableViewComponent.updateList(this.memberList);
                    console.log("Member List", this.memberList);
                }
            },
        });
    }

    removeMember(member: MemberModel) {
        this.dialog.open(DialogRemoveMemberComponent, {
            data: {
                member: member,
                workspace: this.workspace
            }
        }).afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.memberList = this.memberList.filter((i: any) => i !== val);
                    this.gridOrTableViewComponent.updateList(this.memberList);
                }
            },
        });
    }
}
