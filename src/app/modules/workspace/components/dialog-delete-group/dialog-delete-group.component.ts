import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { GroupModel } from 'src/app/models/group.model';
import { DialogDeleteWorkspaceComponent } from 'src/app/modules/workspace-list/components/dialog-delete-workspace/dialog-delete-workspace.component';

@Component({
	selector: 'app-dialog-delete-group',
	templateUrl: './dialog-delete-group.component.html',
	styleUrl: './dialog-delete-group.component.scss'
})
export class DialogDeleteGroupComponent {
	public dialogTitle = "Delete workspace";
	public group!: GroupModel;

	public buttons = [
		{
			text: "Cancel",
			color: "primary",
			action: () => {
				this.dialog.close(false);
			}
		},
		{
			text: "Delete",
			color: "warn",
			action: this.delete.bind(this)
		}
	];

	constructor(private apiService: ApiService,
		private dialog: MatDialogRef<DialogDeleteWorkspaceComponent>,
		private snackBarService: SnackBarService,
		@Inject(MAT_DIALOG_DATA) data: { group: GroupModel }) {
		this.group = data.group;
		this.dialogTitle = `Are you sure you want to delete the workspace "${data.group.name}"?`;
	}

	delete(): void {
		this.apiService.deleteGroup(this.group.id).subscribe({
			next: (response: any) => {
				this.snackBarService.openSnackBar("Group deleted successfully");
				this.dialog.close(this.group);
			},
			error: (err: any) => {
				this.snackBarService.openSnackBar("Group could not be deleted", "ok", "error");
				console.error(err);
			},
		});
	}
}
