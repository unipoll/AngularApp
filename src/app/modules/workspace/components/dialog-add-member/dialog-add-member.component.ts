import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, map, Observable, tap } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA, O } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AccountModel } from 'src/app/models/account.model';
import { MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';

@Component({
    selector: 'dialog-add-member',
    templateUrl: './dialog-add-member.component.html',
    styleUrl: './dialog-add-member.component.scss'
})
export class DialogAddMemberComponent {
    form = new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
    });

    title = "Add member to the workspace";
    buttons = [
        {
            text: "Cancel",
            color: "basic",
            action: () => {
                this.dialog.close(false);
            }
        },
        {
            text: "Invite",
            color: "primary",
            action: this.addMember.bind(this)
        }
    ];

    workspace!: WorkspaceModel;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    accountCtrl = new FormControl<string | AccountModel>('');
    filteredAccounts: Observable<AccountModel[]>;
    accounts: AccountModel[] = [];
    allAccounts: AccountModel[] = [];

    @ViewChild('accountInput')
    accountInput!: ElementRef<HTMLInputElement>;

    announcer = inject(LiveAnnouncer);

    constructor(
        private dialog: MatDialogRef<DialogAddMemberComponent>,
        private apiService: ApiService,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        this.workspace = this.data.workspace;
        
        this.apiService.getAllAccounts().pipe(
            tap((data) => (
                this.allAccounts = data.accounts.filter(
                    ({ id: account_id }: { id: string }) => (!this.data.memberList.some(({ account_id: member_account_id }: { account_id: string }) => member_account_id === account_id))
                )
            ))
        ).subscribe();

        this.filteredAccounts = this.accountCtrl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.first_name;
                return name ? this.filter(name as string) : this.allAccounts.slice();
            }),
            // map((filter_field: string | null) => (filter_field ? this._filter(filter_field) : this.allAccounts))
        );
    }

    displayFn(account: MemberModel): string {
        return account && account.first_name ? account.first_name : '';
    }

    // When a chip is removed
    remove(member: AccountModel): void {
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

    // Filter the autocomplete list
    filter(value: string): AccountModel[] {
        // console.log("Filter Value", value);
        const filterValue = value.toLowerCase();
        return this.allAccounts.filter((account: AccountModel) => (
            account.first_name.toLowerCase().includes(filterValue) ||
            account.last_name.toLowerCase().includes(filterValue) ||
            account.email.toLowerCase().includes(filterValue)));
    }

    addMember() {
        // Create array of account ids
        let newMemberIDs = this.accounts.map((account: AccountModel) => account.id);
        let req = { "accounts": newMemberIDs };

        if (this.accounts.length > 0) {
            this.apiService.addMemberToWorkspace(this.workspace.id, req).subscribe({
                next: (val: any) => {
                    this.snackBarService.openSnackBar('Members added successfully');
                    this.dialog.close(val);
                },
                error: (err: any) => {
                    this.snackBarService.openSnackBar('Error adding members: err', 'ok', 'error');
                    console.error(err);
                },
            });
        }
    }
}