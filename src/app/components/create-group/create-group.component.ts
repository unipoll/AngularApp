import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent {

  groupForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  constructor(
    private _apiService: ApiService,
    private _dialog: MatDialogRef<CreateWorkspaceComponent>,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.groupForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.groupForm.valid) {
      this._apiService.createGroup(this.data.workspace_id, this.groupForm.value).subscribe({
        next: (val: any) => {
          this._snackBarService.openSnackBar('Group created successfully');
          this._dialog.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
