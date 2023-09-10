import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleChoiceComponent } from '../../components/questions/single-choice/single-choice.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    SingleChoiceComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule.forChild()
  ],
  exports: [
    SingleChoiceComponent
  ]
})
export class QuestionsModule { }
