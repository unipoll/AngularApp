import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-dialog-update-workspace',
    templateUrl: './dialog-update-workspace.component.html',
    styleUrls: ['./dialog-update-workspace.component.scss']
})
export class DialogUpdateWorkspaceComponent implements OnInit {
    form = new FormGroup({
		name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
		description: new FormControl("", Validators.maxLength(1000)),
	});

    private workspace!: WorkspaceModel;

    title = "Update Workspace";
    buttons = [
        {
            text: "Cancel",
            color: "basic",
            action: () => {
                this.dialog.close();
            },
        },
        {
            text: "Update",
            color: "primary",
            action: this.submitForm.bind(this)
        }
    ];

    constructor(
        private apiService: ApiService,
        private dialog: MatDialogRef<DialogUpdateWorkspaceComponent>,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) public data: {workspace: WorkspaceModel}) {
        this.workspace = data.workspace;
    }

    ngOnInit(): void {
        this.form.patchValue({
            name: this.workspace.name, 
            description: this.workspace.description
        });
    }

    submitForm() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
			this.apiService.updateWorkspace(this.workspace.id, this.form.value).subscribe({
                next: (updated_workspace: WorkspaceModel) => {
					this.snackBarService.openSnackBar('Workspace updated successfully');
					this.dialog.close(updated_workspace);
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