import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service'
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { HttpErrorResponse } from '@angular/common/http';


// export function nonUniqueNameValidator() {
//     if (this.form.controls['name'].hasError('notUnique')) {
//         return { 'notUnique': true };
//     }
//     return null;
// }


@Component({
	selector: 'app-dialog-create-workspace',
	templateUrl: './dialog-create-workspace.component.html',
	styleUrls: ['./dialog-create-workspace.component.scss']
})
export class DialogCreateWorkspaceComponent {
	form = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
		description: new FormControl("", Validators.maxLength(1000)),
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
				next: (new_workspace: WorkspaceModel) => {
					this.snackBarService.openSnackBar('Workspace created successfully');
					this.dialog.close(new_workspace);
				},
				error: (error: HttpErrorResponse) => {
                    this.snackBarService.openSnackBar('There was an error while creating workspace', 'OK', 'error');
					switch (error.status) {
                        case 409:
                            if (error.error.detail == `Workspace with name ${this.form.controls.name.value} already exists`) {    
                                this.form.controls.name.setErrors({nonUniqueName: true});
                            }
                            break;
                    }
				},
			});
		}
	}
}