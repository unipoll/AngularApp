import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service'
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
	selector: 'app-dialog-create-workspace',
	templateUrl: './dialog-create-workspace.component.html',
	styleUrls: ['./dialog-create-workspace.component.scss']
})
export class DialogCreateWorkspaceComponent {
	form = new FormGroup({
		name: new FormControl("", Validators.required),
		description: new FormControl("", Validators.required),
	});

	title = "Create new workspace";
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
			action: this.submitForm.bind(this)
		}
	];

	constructor(
		private apiService: ApiService,
		private dialog: MatDialogRef<DialogCreateWorkspaceComponent>,
		private snackBarService: SnackBarService
	) { }

	submitForm() {
		this.form.markAllAsTouched();
		if (this.form.valid) {
			this.apiService.createWorkspace(this.form.value).subscribe({
				next: (val: any) => {
					this.snackBarService.openSnackBar('Workspace created successfully');
					this.dialog.close(val);
				},
				error: (err: any) => {
					console.error(err);
				},
			});
		}
	}
}