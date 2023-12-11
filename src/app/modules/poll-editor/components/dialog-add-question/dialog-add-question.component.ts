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
    templateUrl: './dialog-add-question.component.html',
    styleUrls: ['./dialog-add-question.component.scss']
})
export class DialogAddQuestionComponent {
    constructor(private dialog: MatDialogRef<DialogAddQuestionComponent>) { }

    questionTypeControl = new FormControl<QuestionType | null>(null, Validators.required);

    question_types: QuestionType[] = [
        {
            returnValue: 'single-choice',
            name: 'Single Choice Question',
            description: 'A question with only one correct answer',
        },
        {
            returnValue: 'multiple-choice',
            name: 'Multiple Choice Question',
            description: 'A question with multiple correct answers',
        },
    ];

    buttons = [
        {
            text: 'Cancel',
            color: 'warn',
            action: () => {
                this.dialog.close();
            }
        },
        {
            text: 'Add',
            color: 'primary',
            action: this.onSubmit.bind(this)
        }
    ];

    onSubmit() {
        this.dialog.close(this.questionTypeControl.value);
    }
}
