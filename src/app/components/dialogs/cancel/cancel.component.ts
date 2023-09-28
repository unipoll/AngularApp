import { Input } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dialogTitle: string;
  dialogMessage: string;
}

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class DialogCancelComponent {
  
  public dialogTitle!: string;
  public dialogMessage!: string;

  constructor(public dialogRef: MatDialogRef<DialogCancelComponent>, 
    @Inject(MAT_DIALOG_DATA) data: DialogData) {
      this.dialogTitle = data.dialogTitle;
      this.dialogMessage = data.dialogMessage;
    }
}