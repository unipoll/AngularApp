import { Component, ElementRef, Inject, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { SnackBarService } from 'src/app/core/services/snackbar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startWith, map, Observable, tap } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, COMMA, O } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MemberListModel, MemberModel } from 'src/app/models/member.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { GroupModel } from 'src/app/models/group.model';

@Component({
    selector: 'dialog-add-group-member',
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

    // workspace!: WorkspaceModel;
    group!: GroupModel;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    memberCtrl = new FormControl<string | MemberModel>('');
    filteredMembers: Observable<MemberModel[]>;
    members: MemberModel[] = [];
    allMembers: MemberModel[] = [];

    @ViewChild('memberInput')
    memberInput!: ElementRef<HTMLInputElement>;

    announcer = inject(LiveAnnouncer);

    constructor(
        private dialog: MatDialogRef<DialogAddMemberComponent>,
        private apiService: ApiService,
        private snackBarService: SnackBarService,
        @Inject(MAT_DIALOG_DATA) data: {groupMembers: MemberModel[], group: GroupModel}
    ) {
        this.group = data.group;
        
        this.apiService.getWorkspaceMembers(data.group.workspace.id).pipe(
            tap({
                next: (response) => {
                    console.log("Workspace Members", response);
                    this.allMembers = response.members.filter(
                        ({ id: id1 }: { id: string }) => (!data.groupMembers.some(({ id: id2 }: { id: string }) => id1 === id2))
                    )
                }
            })
        ).subscribe();

        // this.allMembers = data.workspaceMembers.filter(
        //     ({ id: member_id }: { id: string }) => (!data.memberList.some(({ member_id: member_member_id }: { member_id: string }) => member_member_id === member_id))
        // )

        this.filteredMembers = this.memberCtrl.valueChanges.pipe(
            startWith(''),
            map(value => {
                const name = typeof value === 'string' ? value : value?.first_name;
                return name ? this.filter(name as string) : this.allMembers.slice();
            }),
            // map((filter_field: string | null) => (filter_field ? this._filter(filter_field) : this.allMembers))
        );
    }

    displayFn(member: MemberModel): string {
        return member && member.first_name ? member.first_name : '';
    }

    // When a chip is removed
    remove(member: MemberModel): void {
        const index = this.members.indexOf(member);
        // console.log("Index", index);

        if (index >= 0) {
            this.members.splice(index, 1);   // Remove chip
            this.allMembers.push(member);    // Add back to the autocomplete list
            this.memberCtrl.setValue(null);  // Clear the input value to reset the autocomplete
            this.announcer.announce(`Removed ${member}`);
        }
    }

    // When item is selected from the list
    selected(event: MatAutocompleteSelectedEvent): void {
        this.members.push(event.option.value);
        let index = this.allMembers.indexOf(event.option.value);
        this.allMembers.splice(index, 1);  // Remove from autocomplete list

        this.memberInput.nativeElement.value = '';
        this.memberCtrl.setValue(null);
    }

    // Filter the autocomplete list
    filter(value: string): MemberModel[] {
        // console.log("Filter Value", value);
        const filterValue = value.toLowerCase();
        return this.allMembers.filter((member: MemberModel) => (
            member.first_name.toLowerCase().includes(filterValue) ||
            member.last_name.toLowerCase().includes(filterValue) ||
            member.email.toLowerCase().includes(filterValue)));
    }

    addMember() {
        // Create array of member ids
        let newMemberIDs = this.members.map((member: MemberModel) => member.id);
        let req = { "members": newMemberIDs };

        if (this.members.length > 0) {
            this.apiService.addMemberToGroup(this.group.id, req).subscribe({
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