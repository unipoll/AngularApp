import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';


@Component({
	selector: 'app-dialog-delete-workspace',
	templateUrl: './dialog-delete-workspace.component.html',
	styleUrls: ['./dialog-delete-workspace.component.scss']
})
export class DialogDeleteWorkspaceComponent {

	public dialogTitle = "Delete workspace";
	public workspaceID!: string;

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

	constructor(@Inject(MAT_DIALOG_DATA) private data: any, 
				private apiService: ApiService,
				private dialog: MatDialogRef<DialogDeleteWorkspaceComponent>,
				private snackBarService: SnackBarService){
		this.workspaceID = data.workspaceID;
		this.dialogTitle = `Are you sure you want to delete the workspace "${ data.workspaceName }"?`;
	}

	delete(): void {
		this.apiService.deleteWorkspace(this.workspaceID).subscribe({
			next: (response: any) => {
				this.snackBarService.openSnackBar("Workspace deleted successfully");
				this.dialog.close(this.workspaceID);
			},
			error: (err: any) => {
				this.snackBarService.openSnackBar("Workspace deleted successfully", "ok", "error");
				console.error(err);
			},
		});
	}
}