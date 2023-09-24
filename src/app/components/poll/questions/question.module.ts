import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SingleChoiceComponent } from "./single-choice/single-choice.component";
import { MultipleChoiceComponent } from "./multiple-choice/multiple-choice.component";
import { MarkdownModule } from "ngx-markdown";
import { MaterialModule } from "src/app/modules/material/material.module";

export { SingleChoiceComponent, MultipleChoiceComponent};

const questions = [
  SingleChoiceComponent,
  MultipleChoiceComponent
];

@NgModule({
  declarations: [
    questions
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
    MaterialModule
  ],
  exports: [
    questions
  ]
})
export class QuestionModule { }