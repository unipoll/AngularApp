import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent {
  
  public dialogMessage!: string;

  private resourceType!: string;
  private resourceName!: string;
  private resourceID!: string;
  private memberID!: string;
  private memberName!: string;
  private parentResourceType!: string;
  private parentResourceName!: string;
  private parentResourceID!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: any, private apiService: ApiService,
    private _snackBarService: SnackBarService,
    ) {
      this.resourceType = data.resourceType;
      this.resourceName = data.resourceName;
      this.resourceID = data.resourceID;
      switch (this.resourceType) {
        case 'member':
          this.dialogMessage = `Are you sure you want to remove member ${data.resourceName} from the ${data.parentResourceType} ${data.parentResourceName}?`;
          this.parentResourceType = data.parentResourceType;
          this.parentResourceName = data.parentResourceName;
          this.parentResourceID = data.parentResourceID;
          break;
        default:
          this.dialogMessage = `Are you sure you want to delete the ${this.resourceType} "${this.resourceName}"?`;
          break;
      }
    }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    let request_method;

    switch(this.data.resourceType) {
      case 'workspace':
        request_method = this.apiService.deleteWorkspace(this.resourceID);
        break;
      case 'group':
        request_method = this.apiService.deleteGroup(this.resourceID);
        break;
      case 'member':
        if (this.parentResourceType === 'workspace') {
          request_method = this.apiService.removeMemberFromWorkspace(this.parentResourceID, this.resourceID);
        } else if (this.parentResourceType === 'group') {
          request_method = this.apiService.removeMemberFromGroup(this.parentResourceID, this.resourceID);
        }
        break;
    }

    if (request_method) {
      request_method.subscribe({
        next: (val: any) => {
          console.log("Val", val);
          this._snackBarService.openSnackBar(`${this.memberName} has been successfully removed`);
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}