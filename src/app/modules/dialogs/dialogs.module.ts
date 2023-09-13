import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { DialogDeleteComponent } from '../../components/dialogs/dialog-delete/dialog-delete.component';
import { DialogCreateComponent } from '../../components/dialogs/dialog-create/dialog-create.component';
import { DialogUpdateComponent } from '../../components/dialogs/dialog-update/dialog-update.component';
import { DialogAddMemberComponent } from '../../components/dialogs/dialog-add-member/dialog-add-member.component';
import { DialogAddPolicyComponent } from '../../components/dialogs/dialog-add-policy/dialog-add-policy.component';
import { PolicyListComponent } from '../../components/policy-list/policy-list.component';
import { DialogSetPolicyComponent } from '../../components/dialogs/dialog-set-policy/dialog-set-policy.component';
import { AddQuestionComponent } from '../../components/dialogs/add-question/add-question.component';
import { DialogCancelComponent } from 'src/app/components/dialogs/cancel/cancel.component';

const dialogs = [
  DialogDeleteComponent,
  DialogCreateComponent,
  DialogUpdateComponent,
  DialogAddMemberComponent,
  DialogAddPolicyComponent,
  PolicyListComponent,
  DialogSetPolicyComponent,
  AddQuestionComponent,
  DialogCancelComponent,
];

@NgModule({
  declarations: [
    dialogs
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    dialogs
  ]
})
export class DialogsModule { }
