import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { DialogCreateWorkspaceComponent } from 'src/app/modules/workspace-list/components/dialog-create-workspace/dialog-create-workspace.component';
import { NewPollRequestBody } from 'src/app/models/poll.model';


@Component({
    selector: 'app-dialog-create-poll',
    templateUrl: './dialog-create-poll.component.html',
    styleUrl: './dialog-create-poll.component.scss'
})
export class DialogCreatePollComponent {
    form = new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl(""),
    });

    title = "Create new Poll";
    buttons = [
        {
            text: "Cancel",
            color: "basic",
            action: () => {
                this.dialog.close(false);
            }
        },
        {
            text: "Create",
            color: "primary",
            action: this.createPoll.bind(this)
        }
    ];

    workspace!: WorkspaceModel;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialogRef<DialogCreateWorkspaceComponent>,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) public data: { workspace: WorkspaceModel }
    ) {
        this.workspace = data.workspace;
    }

    // Create a new poll
    createPoll() {
        this.form.markAllAsTouched();
        if (this.form.valid) {

            const request_body = {
                name: this.form.get('name')?.value as string,
                description: this.form.get('description')?.value as string,
                questions: [],
                public: false,
                published: false
            }

            this.apiService.createPoll(this.workspace.id, request_body).subscribe({
                next: (created_poll: any) => {
                    this.snackBarService.openSnackBar('Poll created successfully');
                    this.dialog.close(created_poll);
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
    }
}
