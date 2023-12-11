import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { GroupModel } from 'src/app/models/group.model';
import { PollModel } from 'src/app/models/poll.model';
import { DialogDeleteWorkspaceComponent } from 'src/app/modules/workspace-list/components/dialog-delete-workspace/dialog-delete-workspace.component';




@Component({
  selector: 'app-dialog-delete-poll',
  templateUrl: './dialog-delete-poll.component.html',
  styleUrl: './dialog-delete-poll.component.scss'
})
export class DialogDeletePollComponent {
	poll: PollModel;
  dialogTitle: string;

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
              @Inject(MAT_DIALOG_DATA) data: { poll: PollModel}){
		this.poll = data.poll;
		this.dialogTitle = `Are you sure you want to delete the poll "${ data.poll.name }"?`;
	}

	delete(): void {
		this.apiService.deletePoll(this.poll.id).subscribe({
			next: () => {
				this.snackBarService.openSnackBar("Poll deleted successfully");
				this.dialog.close(this.poll);
			},
			error: (err: any) => {
				this.snackBarService.openSnackBar("Poll could not be deleted", "ok", "error");
				console.error(err);
			},
		});
	}
}
