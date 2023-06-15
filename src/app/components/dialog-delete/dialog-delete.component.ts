import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private apiService: ApiService) { }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    // NOTE: move this to API service
    // return this.http.delete(APU + '/' + this.data.resource_type + 's/' + id);

  }
}