
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject, Inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { MemberListModel, MemberModel } from 'src/app/models/member.model';
import { AccountListModel, AccountModel } from 'src/app/models/account.model';

@Component({
  selector: 'app-dialog-add-member',
  templateUrl: './dialog-add-member.component.html',
  styleUrls: ['./dialog-add-member.component.scss']
})
export class DialogAddMemberComponent {
  // form = new FormGroup({
  //   name: new FormControl("", Validators.required),
  //   description: new FormControl("", Validators.required),
  // });

  separatorKeysCodes: number[] = [ENTER, COMMA];
  accountCtrl = new FormControl<string | MemberModel>('');
  filteredAccounts: Observable<MemberModel[]>;
  accounts: MemberModel[] = [];
  allAccounts: AccountModel[] = []; 

  @ViewChild('accountInput')
  accountInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    private _workspaceService: WorkspaceService,
    private _apiService: ApiService,
    private _dialog: MatDialogRef<DialogCreateComponent>,
    private _snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.allAccounts = this.data.accountList;
    this.filteredAccounts = this.accountCtrl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.first_name;
        return name ? this._filter(name as string) : this.allAccounts.slice();
      }),
      // map((filter_field: string | null) => (filter_field ? this._filter(filter_field) : this.allAccounts))
    );
  }

  displayFn(account: MemberModel): string {
    return account && account.first_name ? account.first_name : '';
  }

  // Use add method for adding custom filds values(not from the list)
  /*add(event: MatChipInputEvent): void {
    alert("added");
    const value = (event.value || '').trim();
    // const value = event.value;
    console.log("Add Value", value);

    // Add the member
    if (value) {
      // let test = this._filter(value);
      console.log("Value in add()", value);
      // if (this.allAccounts.includes(value)) {
    //     this.accounts.push(value);
      // }
      // this.accounts.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.accountCtrl.setValue(null);
  }*/

  // When a chip is removed
  remove(member: MemberModel): void {
    const index = this.accounts.indexOf(member);
    // console.log("Index", index);

    if (index >= 0) {
      this.accounts.splice(index, 1);   // Remove chip
      this.allAccounts.push(member);    // Add back to the autocomplete list
      this.accountCtrl.setValue(null);  // Clear the input value to reset the autocomplete
      this.announcer.announce(`Removed ${member}`);
    }
  }

  // When item is selected from the list
  selected(event: MatAutocompleteSelectedEvent): void {
    this.accounts.push(event.option.value);
    let index = this.allAccounts.indexOf(event.option.value);
    this.allAccounts.splice(index, 1);  // Remove from autocomplete list
    
    this.accountInput.nativeElement.value = '';
    this.accountCtrl.setValue(null);
  }

  private _filter(value: string): MemberModel[] {
    // console.log("Filter Value", value);
    const filterValue = value.toLowerCase();
    return this.allAccounts.filter((account: MemberModel) => (
      account.first_name.toLowerCase().includes(filterValue) || 
      account.last_name.toLowerCase().includes(filterValue) ||
      account.email.toLowerCase().includes(filterValue)));
  }

  onFormSubmit() {
    console.log("Accounts", this.accounts);

    // Create array of account ids
    let newMemberIDs = this.accounts.map((account: MemberModel) => account.id);
    let req = { "accounts": newMemberIDs };

    if (this.accounts.length > 0) {
      let request_method = null;
      console.log("Resource Type", this.data.resource.type);
      if (this.data.resource.type == 'workspace') {
        request_method = this._apiService.addMemberToWorkspace(this.data.resource.id, req);
      } else if (this.data.resource_type == 'group') {
        // request_method = this._apiService.createGroup(this.data.workspace_id, this.form.value);
        console.log("Group ID", this.data.group_id);
      }
      if (request_method) {
        request_method.subscribe({
          next: (val: any) => {
            console.log("Val", val);
            this._snackBarService.openSnackBar('Members added successfully');
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
