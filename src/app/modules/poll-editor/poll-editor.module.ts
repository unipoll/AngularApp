import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleChoiceComponent } from './components/questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './components/questions/multiple-choice/multiple-choice.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { PollEditorComponent } from './components/poll-editor/poll-editor.component';
import { PollEditorRoutingModule } from './poll-editor-routing.module';
import { DialogAddQuestionComponent } from './components/dialog-add-question/dialog-add-question.component';
import { DialogExitComponent } from './components/dialog-exit/dialog-exit.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { DialogUpdatePolicyComponent } from './components/dialog-update-policy/dialog-update-policy.component';
import { DialogViewPolicyComponent } from './components/dialog-view-policy/dialog-view-policy.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { GridOrTableViewComponent } from 'src/app/shared/components/grid-or-table-view/grid-or-table-view.component';
import { PageLoadingSpinnerComponent } from 'src/app/shared/components/page-loading-spinner/page-loading-spinner.component';


@NgModule({
    declarations: [
        PollEditorComponent,
        DialogAddQuestionComponent,
        DialogExitComponent,
        SingleChoiceComponent,
        MultipleChoiceComponent,
        PolicyListComponent,
        DialogViewPolicyComponent,
        DialogUpdatePolicyComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        PollEditorRoutingModule,
        MarkdownModule.forChild(),
        DialogComponent,
        GridOrTableViewComponent,
        PageLoadingSpinnerComponent
    ],
    exports: [
    ]
})
export class PollEditorModule { }
