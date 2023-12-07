import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SnackBarService } from 'src/app/core/services/snackbar.service';


interface DialogButton {
	text: string;
	action: Function;
	color: string | "primary";
}


@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [MaterialModule],
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.scss'
})
export class DialogComponent {

	@Input() dialogTitle!: string;
	@Input() dialogMessage!: string;
	@Input() dialogButtons: DialogButton[] = [
		{
			text: "Ok",
			action: () => {
				this.dialogRef.close();
			},
			color: "primary"
		},
	];

	constructor(public dialogRef: MatDialogRef<DialogComponent>){
	}
}
