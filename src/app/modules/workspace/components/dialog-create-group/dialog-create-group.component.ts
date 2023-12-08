import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { DialogCreateWorkspaceComponent } from 'src/app/modules/workspace-list/components/dialog-create-workspace/dialog-create-workspace.component';

@Component({
    selector: 'app-dialog-create-group',
    templateUrl: './dialog-create-group.component.html',
    styleUrl: './dialog-create-group.component.scss'
})
export class DialogCreateGroupComponent {
    form = new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl(""),
    });

    title = "Create new group";
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
            action: this.createGroup.bind(this)
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

	createGroup() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.apiService.createGroup(this.workspace.id, this.form.value).subscribe({
				next: (group: any) => {
					this.snackBarService.openSnackBar('Group created successfully');
					this.dialog.close(group);
				},
				error: (err: any) => {
					console.error(err);
				},
			});
		}
	}
}
