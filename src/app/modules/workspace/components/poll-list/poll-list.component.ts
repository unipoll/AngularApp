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
    displayedColumns: string[] = ["name", "description", "questions", "public", "published"];
    optionsMenu = [
        {
            label: "View",
            action: (poll: PollModel) => this.getPoll(poll)
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
        this.can_add_polls = this.authService.isAllowed('create_polls');
        console.log(this.authService.getPermissions());
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

    createPoll() {
        // const dialogRef = this.dialog.open(DialogCreateComponent, {
        //   data: { 
        //     resource_type: 'poll',
        //   },
        // });

        // dialogRef.afterClosed().subscribe({
        //   next: (val) => {
        //     if (val) {
        //       this.updateWorkspaceList();
        //     }
        //   },
        // });

        // this.router.navigate(['/workspace', 'new-poll']);
        this.router.navigate(['/new-poll'], {
            relativeTo: this.route
        });
    }

    editPoll(poll: PollModel) {
        // const data: DialogUpdateModel = {
        //   workspace_id: workspace.id,
        //   id: workspace.id,
        //   name: workspace.name,
        //   description: workspace.description,
        //   resource_type: 'workspace',
        // };
        // const dialogRef = this.dialog.open(DialogUpdateComponent, { data });
        // dialogRef.afterClosed().subscribe({
        //   next: (val) => {
        //     if (val) {
        //       this.updateWorkspaceList();
        //     }
        //   },
        // });
    }

    deletePoll(poll: PollModel): void {
        // const dialogRef = this.dialog.open(DialogDeleteComponent, {
        //   data: {
        //     resourceType: 'poll',
        //     resourceID: poll.id,
        //     resourceName: poll.name,

        //   }
        // });
        // dialogRef.afterClosed().subscribe({
        //   next: (val) => {
        //     if (val) {
        //       this.updatePollList();
        //     }
        //   },
        // });
    }

}

