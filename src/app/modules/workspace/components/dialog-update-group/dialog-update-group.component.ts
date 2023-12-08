import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { GroupModel } from 'src/app/models/group.model';
import { DialogCreateWorkspaceComponent } from 'src/app/modules/workspace-list/components/dialog-create-workspace/dialog-create-workspace.component';

@Component({
    selector: 'app-dialog-update-group',
    templateUrl: './dialog-update-group.component.html',
    styleUrl: './dialog-update-group.component.scss'
})
export class DialogUpdateGroupComponent implements OnInit {
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
            text: "Save",
            color: "primary",
            action: this.updateGroup.bind(this)
        }
    ];

    group!: GroupModel;

    constructor(
        private apiService: ApiService,
        private dialog: MatDialogRef<DialogCreateWorkspaceComponent>,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) public data: { group: GroupModel }
    ) {
        this.group = data.group;
    }

    ngOnInit(): void {
        this.form.patchValue({
            name: this.group.name,
            description: this.group.description
        });
    }

    updateGroup() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.apiService.updateGroup(this.group.id, this.form.value).subscribe({
                next: (group: any) => {
                    this.snackBarService.openSnackBar('Group updated successfully');
                    this.dialog.close(group);
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
    }
}
