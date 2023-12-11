import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface DialogData {
    dialogTitle: string;
    dialogMessage: string;
}

@Component({
    selector: 'app-cancel',
    templateUrl: './dialog-exit.component.html',
    styleUrls: ['./dialog-exit.component.scss']
})
export class DialogExitComponent {

    dialogTitle = 'Exit poll editor?';
    dialogMessage = 'Are you sure you want to cancel? All unsaved changes will be lost.';
    buttons = [
        {
            text: 'Exit',
            color: 'warn',
            action: () => {
				this.dialog.close(true);
			}
        },
        {
            text: 'Continue',
            color: 'primary',
            action: () => {
                this.dialog.close(false);
            }
        }
    ]; 

    constructor(public dialog: MatDialogRef<DialogExitComponent>) {}
}