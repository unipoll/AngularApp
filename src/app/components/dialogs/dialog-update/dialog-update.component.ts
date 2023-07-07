import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss']
})
export class DialogUpdateComponent implements OnInit{
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
  });

  constructor(
    private _workspaceService: WorkspaceService,
    private _apiService: ApiService,
    private _dialog: MatDialogRef<DialogCreateComponent>,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogUpdateModel
  ) {}
  
  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onFormSubmit() {
    let request_method = null;
    if (this.data.resource_type == 'workspace') {
      request_method = this._apiService.updateWorkspace(this.data.id, this.form.value);
    } else if (this.data.resource_type == 'group') {
      request_method = this._apiService.updateGroup(this.data.id, this.form.value);
    }
    if (request_method) {
      request_method.subscribe({
        next: (val: any) => {
          this._snackBarService.openSnackBar('Workspace updated successfully');
          this._dialog.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
