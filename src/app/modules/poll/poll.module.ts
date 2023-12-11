import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollRoutingModule } from './poll-routing.module';
import { PollComponent } from './components/poll/poll.component';
import { SingleChoiceComponent } from './components/questions/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './components/questions/multiple-choice/multiple-choice.component';
import { QuestionComponent } from './components/question/question.component';
import { MaterialModule } from '../material/material.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
    declarations: [
        PollComponent,
        QuestionComponent,
        SingleChoiceComponent,
        MultipleChoiceComponent
    ],
    imports: [
        CommonModule,
        PollRoutingModule,
        MaterialModule,
        MarkdownModule.forChild()
    ],
    exports: [
        PollComponent
    ]
})
export class PollModule { }
