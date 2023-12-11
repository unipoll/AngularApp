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


@NgModule({
    declarations: [
        PollEditorComponent,
        DialogAddQuestionComponent,
        DialogExitComponent,
        SingleChoiceComponent,
        MultipleChoiceComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        PollEditorRoutingModule,
        MarkdownModule.forChild(),
        DialogComponent
    ],
    exports: [
        PollEditorComponent
    ]
})
export class PollEditorModule { }
