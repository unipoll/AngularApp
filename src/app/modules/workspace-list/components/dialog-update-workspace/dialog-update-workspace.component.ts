import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';


@Component({
    selector: 'app-dialog-update-workspace',
    templateUrl: './dialog-update-workspace.component.html',
    styleUrls: ['./dialog-update-workspace.component.scss']
})
export class DialogUpdateWorkspaceComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
    });

    private workspaceID!: string;

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
        @Inject(MAT_DIALOG_DATA) public data: DialogUpdateModel) {
        this.workspaceID = data.id;
    }

    ngOnInit(): void {
        this.form.patchValue(this.data);
    }

    submitForm() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
			this.apiService.updateWorkspace(this.workspaceID, this.form.value).subscribe({
                next: (val: any) => {
                    this.snackBarService.openSnackBar('Workspace updated successfully');
                    this.dialog.close(val);
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
		}
    }
}