import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface QuestionType {
  returnValue: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  

  constructor(private dialog: MatDialogRef<AddQuestionComponent>) { }

  questionTypeControl = new FormControl<QuestionType | null>(null, Validators.required);

  question_types: QuestionType[] = [
    {
      returnValue: 'single-choice', 
      name: 'Single Choice Quesiton',
      description: 'A question with only one correct answer',
    },
    {
      returnValue: 'multiple-choice',
      name: 'Multiple Choice Question',
      description: 'A question with multiple correct answers',
    },
  ];

  onSubmit() {
    this.dialog.close(this.questionTypeControl.value);
  }
}
