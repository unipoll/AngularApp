import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';


@Component({
    selector: 'dialog-remove-group-member',
    templateUrl: './dialog-remove-member.component.html',
    styleUrl: './dialog-remove-member.component.scss'
})
export class DialogRemoveMemberComponent {

    member!: MemberModel;
    workspace!: WorkspaceModel;

    title = 'Remove Member';
    buttons = [
        {
            text: "Cancel",
            color: "primary",
            action: () => {
                this.dialog.close(false);
            }
        },
        {
            text: "Remove",
            color: "warn",
            action: this.removeMember.bind(this)
        }
    ];

    constructor(private dialog: MatDialogRef<DialogRemoveMemberComponent>,
                private apiService: ApiService,
                private snackBarService: SnackBarService,
                @Inject(MAT_DIALOG_DATA) data: any) {
        this.member = data.member;
        this.workspace = data.workspace;
        this.title = `Remove ${this.member.full_name} from ${this.workspace.name}`;
    }
    
    removeMember(): void {
        this.apiService.removeMemberFromWorkspace(this.workspace.id, this.member.id).subscribe({
            next: (response: any) => {
                this.snackBarService.openSnackBar("Workspace deleted successfully");
                this.dialog.close(this.member);
            },
            error: (err: any) => {
                this.snackBarService.openSnackBar("Workspace deleted successfully", "ok", "error");
                console.error(err);
            },
        });
    }

}
