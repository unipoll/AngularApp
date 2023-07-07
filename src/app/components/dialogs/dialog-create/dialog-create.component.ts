import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { WorkspaceService } from '../../../services/workspace.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { DialogUpdateModel } from '../../../models/dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.scss']
})
export class DialogCreateComponent{
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

  onFormSubmit() {
    if (this.form.valid) {
      let request_method = null;
      if (this.data.resource_type == 'workspace') {
        request_method = this._apiService.createWorkspace(this.form.value);
      } else if (this.data.resource_type == 'group') {
        request_method = this._apiService.createGroup(this.data.workspace_id, this.form.value);
      }
      if (request_method) {
        request_method.subscribe({
          next: (val: any) => {
            this._snackBarService.openSnackBar('Workspace created successfully');
            this._dialog.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
