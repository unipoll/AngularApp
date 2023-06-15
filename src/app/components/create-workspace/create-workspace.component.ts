import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss']
})
export class CreateWorkspaceComponent implements OnInit {
  workspaceForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  constructor(
    private _workspaceService: WorkspaceService,
    private _apiService: ApiService,
    private _dialog: MatDialogRef<CreateWorkspaceComponent>,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.workspaceForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.workspaceForm.valid) {
      if (this.data) {
        this._apiService
          .updateWorkspace(this.data.id, this.workspaceForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackBarService.openSnackBar('Workspace details updated');
              this._dialog.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._apiService.createWorkspace(this.workspaceForm.value).subscribe({
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
