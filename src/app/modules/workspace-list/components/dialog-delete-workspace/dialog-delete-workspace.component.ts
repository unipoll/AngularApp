import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';


@Component({
	selector: 'app-dialog-delete-workspace',
	templateUrl: './dialog-delete-workspace.component.html',
	styleUrls: ['./dialog-delete-workspace.component.scss']
})
export class DialogDeleteWorkspaceComponent {

	public dialogTitle = "Delete workspace";
	public workspace!: WorkspaceModel;

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
			action: this.deleteWorkspace.bind(this)
		}
	];

	constructor(@Inject(MAT_DIALOG_DATA) private data: { workspace: WorkspaceModel}, 
				private apiService: ApiService,
				private dialog: MatDialogRef<DialogDeleteWorkspaceComponent>,
				private snackBarService: SnackBarService){
		this.workspace = data.workspace;
		this.dialogTitle = `Are you sure you want to delete the workspace "${ data.workspace.name }"?`;
	}

	deleteWorkspace(): void {
		this.apiService.deleteWorkspace(this.workspace.id).subscribe({
			next: (response: any) => {
				this.snackBarService.openSnackBar("Workspace deleted successfully");
				this.dialog.close(this.workspace.id);
			},
			error: (err: any) => {
				this.snackBarService.openSnackBar("There was an error while deleing workspace", "ok", "error");
			},
		});
	}
}