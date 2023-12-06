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

@Component({
    selector: 'app-dialog-edit-policy',
    templateUrl: './dialog-edit-policy.component.html',
    styleUrl: './dialog-edit-policy.component.scss'
})
export class DialogEditPolicyComponent {
    
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
            action: this.onFormSubmit.bind(this)
        }
    ];

    // ?
    announcer = inject(LiveAnnouncer);

    constructor(
        private apiService: ApiService,
        private dialog: MatDialogRef<DialogEditPolicyComponent>,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) {
        console.log("All Permissions", this.data);
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

    onFormSubmit() {
        let request_method = null;

        let request_data = {
            permissions: this.permissions
        };

        console.log("Resource Type", this.data.resource.type);
        if (this.data.resource.type == 'workspace') {
            console.log("request_data", request_data);
            request_method = this.apiService.updateWorkspacePolicy(this.data.resource.id, this.policy.id, request_data);
        } else if (this.data.resource.type == 'group') {
            request_method = this.apiService.updateGroupPolicy(this.policy.id, this.policy.id, request_data);
        }


        if (request_method) {
            console.log("Request: ", request_data);
            request_method.subscribe({
                next: (val: any) => {
                    this.snackBarService.openSnackBar('Workspace updated successfully');
                    this.dialog.close(true);
                },
                error: (err: any) => {
                    console.error(err);
                },
            });
        }
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
        console.log("Permission Input", this.permissionInput);
        this.permissionInput.nativeElement.value = '';
        this.permissionCtrl.setValue(null);
    }

    private filter(value: string): string[] {
        // console.log("Filter Value", value);
        const filterValue = value.toLowerCase().replaceAll(' ', '_');
        return this.allPermissions.filter(permission => permission.toLowerCase().includes(filterValue));
    }
}
