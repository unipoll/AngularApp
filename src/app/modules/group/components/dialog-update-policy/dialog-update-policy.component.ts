import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { PolicyModel } from 'src/app/models/policy.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';

interface DialogData {
    workspace: WorkspaceModel;
    policy: PolicyModel;
    allPermissions: string[];
}

@Component({
    selector: 'dialog-update-group-policy',
    templateUrl: './dialog-update-policy.component.html',
    styleUrl: './dialog-update-policy.component.scss'
})
export class DialogUpdatePolicyComponent {
    
    // Dialog Data Input
    permissions: string[] = [];  // Current permissions
    allPermissions: string[]; // All permissions available
    policy: PolicyModel;

    // Autocomplete
    separatorKeysCodes: number[] = [ENTER, COMMA];
    permissionCtrl = new FormControl('');
    filteredPermissions: Observable<string[]>;

    @ViewChild('permissionInput') permissionInput!: ElementRef<HTMLInputElement>;

    // Dialog component
    title = "Update Policy"
    buttons = [
        {
            text: "Cancel",
            color: "basic",
            action: () => {
                this.dialog.close(false);
            }
        },
        {
            text: "Save",
            color: "primary",
            action: this.updatePolicy.bind(this)
        }
    ];

    // ?
    announcer = inject(LiveAnnouncer);

    constructor(private apiService: ApiService,
                private dialog: MatDialogRef<DialogUpdatePolicyComponent>,
                private snackBarService: SnackBarService,
                @Inject(MAT_DIALOG_DATA) private data: DialogData) {
        this.policy = this.data.policy;
        this.permissions = this.data.policy.permissions.map((permission: string) => permission);
        this.allPermissions = this.data.allPermissions;
        this.allPermissions = this.allPermissions.filter((permission: string) => !this.permissions.includes(permission));

        this.filteredPermissions = this.permissionCtrl.valueChanges.pipe(
            startWith(''),
            map((permission: string | null) => (permission ? this.filter(permission) : this.allPermissions.slice())),
        );
    }

    ngOnInit(): void {
        // this.form.patchValue(this.data);
        // this.form.setValue({
        //   permissions: this.data.permissions,
        // });
    }

    updatePolicy() {
        const request_data = {
            permissions: this.permissions
        };

        this.apiService.updateGroupPolicy(this.policy.id, request_data).subscribe({
            next: (permissionsList: any) => {
                this.snackBarService.openSnackBar('Policy successfully');
                this.dialog.close(permissionsList);
            },
            error: (err: any) => {
                console.error(err);
            },
        });
        this.dialog.close(true);
    }

    // displayFn(permission: string): string {
    //   return permission.replaceAll('_', ' ');
    // }

    // When a chip is removed
    remove(permission: string): void {
        const index = this.permissions.indexOf(permission);

        if (index >= 0) {
            this.permissions.splice(index, 1);   // Remove chip
            this.allPermissions.push(permission);    // Add back to the autocomplete list
            this.permissionCtrl.setValue(null);  // Clear the input value to reset the autocomplete
            this.announcer.announce(`Removed ${permission}`);
        }
    }

    // When item is selected from the list
    selected(event: MatAutocompleteSelectedEvent): void {
        this.permissions.push(event.option.value);
        let index = this.allPermissions.indexOf(event.option.value);
        this.allPermissions.splice(index, 1);  // Remove from autocomplete list
        this.permissionInput.nativeElement.value = '';
        this.permissionCtrl.setValue(null);
    }

    private filter(value: string): string[] {
        // console.log("Filter Value", value);
        const filterValue = value.toLowerCase().replaceAll(' ', '_');
        return this.allPermissions.filter(permission => permission.toLowerCase().includes(filterValue));
    }
}
