import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

import { GroupModel, GroupListModel } from 'src/app/models/group.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';

import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

import { DialogCreateGroupComponent } from '../dialog-create-group/dialog-create-group.component';
import { DialogUpdateGroupComponent } from '../dialog-update-group/dialog-update-group.component';
import { DialogDeleteGroupComponent } from '../dialog-delete-group/dialog-delete-group.component';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';


@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss'],
    // encapsulation : ViewEncapsulation.None,
})
export class GroupListComponent {
    @Input() workspace!: WorkspaceModel;
    @Input() groupList!: GroupModel[];

    @Output() groupEvent = new EventEmitter();

    // Table data
    displayedColumns = ["name", "description"];
    optionsMenu = [
        {
            label: "View",
            action: (group: GroupModel) => this.viewGroup(group)
        },
        {
            label: "Edit",
            action: (group: GroupModel) => this.editGroup(group)
        },
        {
            label: "Delete",
            action: (group: GroupModel) => this.deleteGroup(group)
        },
    ]

    @ViewChild(GridOrTableViewComponent) gridOrTableViewComponent!: GridOrTableViewComponent;
    
    // Permissions
    can_create_groups: boolean = false;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
        this.groupList ? this.groupList : this.updateGroupList();
        this.can_create_groups = this.authService.isAllowed(this.workspace.id, 'add_groups');
    }

    updateGroupList() {
        if (this.workspace) {
            this.apiService.getWorkspaceGroups(this.workspace.id).pipe(
                tap((data) => (
                    this.groupList = data.groups
                ))
            ).subscribe();
        }
    }

    viewGroup(group: GroupModel) {
        this.router.navigate(['workspaces', this.workspace.id, 'groups', group.id]);
    }


    createGroup() {
        this.dialog.open(DialogCreateGroupComponent, {
            data: {
                workspace: this.workspace
            },
        }).afterClosed().subscribe({
            next: (newGroup) => {
                if (newGroup) {
                    this.groupList.push(newGroup);
                    this.gridOrTableViewComponent.updateList(this.groupList);
                    this.groupEvent.emit('groupCreated');
                }
            },
        });
    }

    editGroup(group: GroupModel) {
        this.dialog.open(DialogUpdateGroupComponent, { 
            data: {
                group: group
            },
        }).afterClosed().subscribe({
            next: (updatedGroup) => {
                if (updatedGroup) {
                    this.groupList.forEach((item, index) => {
                        if (item.id === updatedGroup.id) {
                            this.groupList[index] = updatedGroup;
                        }
                    });
                    this.gridOrTableViewComponent.updateList(this.groupList);
                }
            },
        });
    }

    deleteGroup(group: GroupModel): void {
        this.dialog.open(DialogDeleteGroupComponent, {
            data: {
                workspace: this.workspace,
                group: group
            }
        }).afterClosed().subscribe({
            next: (deletedGroup) => {
                if (deletedGroup) {
                    this.groupList = this.groupList.filter((group) => group.id !== deletedGroup.id);
					this.gridOrTableViewComponent.updateList(this.groupList);
                    this.groupEvent.emit('groupDeleted');
                }
            },
        });
    }
}
