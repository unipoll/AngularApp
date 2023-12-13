import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { ApiService } from 'src/app/core/services/api.service';
// import { DialogCreateComponent } from '../dialogs/dialog-create/dialog-create.component';
// import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
// import { DialogUpdateComponent } from '../dialogs/dialog-update/dialog-update.component';

import { PollListModel, PollModel } from 'src/app/models/poll.model';
import { tap } from 'rxjs';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';
import { DialogCreatePollComponent } from '../dialog-create-poll/dialog-create-poll.component';
import { DialogDeletePollComponent } from '../dialog-delete-poll/dialog-delete-poll.component';

@Component({
    selector: 'poll-list',
    templateUrl: './poll-list.component.html',
    styleUrls: ['./poll-list.component.scss'],
    // encapsulation: ViewEncapsulation.None
})
export class PollListComponent implements OnInit {

    @Input() workspace!: WorkspaceModel;
    @Input() pollList!: PollModel[];

    // Table data
    displayedColumns: string[] = ["name", "description", "public", "published"];
    optionsMenu = [
        {
            label: "View",
            action: (poll: PollModel) => this.viewPoll(poll)
        },
        {
            label: "Edit",
            action: (poll: PollModel) => this.editPoll(poll)
        },
        {
            label: "Delete",
            action: (poll: PollModel) => this.deletePoll(poll)
        },
    ]

    @ViewChild(GridOrTableViewComponent) gridOrTableViewComponent!: GridOrTableViewComponent;

    // Permissions
    can_add_polls: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private apiService: ApiService,
        private authService: AuthorizationService) { }

    ngOnInit(): void {
        this.pollList ? this.pollList : this.updatePollList();
        this.can_add_polls = this.authService.isAllowed(this.workspace.id, 'create_polls');
    }

    updatePollList() {
        this.apiService.getAllPolls(this.workspace.id).pipe(tap({
            next: (data: PollListModel) => (
                this.pollList = data.polls
            )
        })).subscribe();
    }

    getPoll(poll: PollModel) {
        this.router.navigate(['/polls', poll.id], {
            relativeTo: this.route
        });
    }

    viewPoll(poll: PollModel) {
        this.router.navigate(['workspaces', this.workspace.id, 'polls', poll.id]);
    }

    createPoll() {
        if (!this.can_add_polls) {
            return;
        }
        this.dialog.open(DialogCreatePollComponent, {
            data: {
                workspace: this.workspace,
            },
        }).afterClosed().subscribe({
            next: (new_poll) => {
                if (new_poll) {
                    this.router.navigate(['workspaces', this.workspace.id, 'polls', new_poll.id, 'edit']);
                }
            },
        });
    }

    editPoll(poll: PollModel) {
        if (!this.authService.isAllowed(this.workspace.id, 'edit_polls') || !this.authService.isAllowed(poll.id, 'update_poll')) {
            return;
        }
        this.router.navigate(['workspaces', this.workspace.id, 'polls', poll.id, 'edit']);
    }

    deletePoll(poll: PollModel): void {
        const dialogRef = this.dialog.open(DialogDeletePollComponent, {
            data: {
                poll: poll,
            }
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    // this.updatePollList();
                    this.pollList = this.pollList.filter((p) => p.id != poll.id);
                    this.gridOrTableViewComponent.updateList(this.pollList);
                }
            },
        });
    }

}

