import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupModel } from 'src/app/models/group.model';
import { MemberModel } from 'src/app/models/member.model';
import { PolicyModel } from 'src/app/models/policy.model';

@Component({
    selector: 'app-dialog-view-policy',
    templateUrl: './dialog-view-policy.component.html',
    styleUrl: './dialog-view-policy.component.scss'
})
export class DialogViewPolicyComponent {

    title: string = "Policy";
    policy: PolicyModel;

    constructor(@Inject(MAT_DIALOG_DATA) private data: { policy: PolicyModel } ) {
        this.policy = this.data.policy;
        if (this.policy.policy_holder_type == 'group') {
            let group = this.policy.policy_holder as GroupModel;
            this.title = "Policy for Group: " + group.name;
        } else if (this.policy.policy_holder_type == 'member') {
            let member = this.policy.policy_holder as MemberModel;
            this.title = "Policy for Member: " + member.full_name;
        }
    }
}
