import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
    selector: 'app-single-choice',
    templateUrl: './single-choice.component.html',
    styleUrls: ['./single-choice.component.scss']
})
export class SingleChoiceComponent {

    @Input() question_number: number = 0;
    @Output() delete: EventEmitter<number> = new EventEmitter<number>();

    // Create a form group 
    questionForm = this.fb.group({
        question_type: ['single-choice'],
        question: [''],
        options: this.fb.array([
            this.fb.control(''),
            this.fb.control('')
        ]),
        correct_answer: this.fb.control(0)
    });

    constructor(private fb: FormBuilder) {
    }

    get options() {
        return this.questionForm.get('options') as FormArray;
    }

    addOption() {
        this.options.push(this.fb.control(''));
    }

    removeOption(index: number) {
        this.options.removeAt(index);
    }

    deleteQuestion() {
        this.delete.emit(this.question_number - 1);
    }

    getQuestion() {
        console.log(this.questionForm.value.correct_answer);
        let qm: QuestionModel = {
            id: this.question_number,
            question_type: this.questionForm.value.question_type as string,
            question: this.questionForm.value.question as string,
            options: this.questionForm.value.options as string[],
            correct_answer: [this.questionForm.value.correct_answer] as number[]
        }

        return qm;
    }

    setQuestion(question: QuestionModel) {

        for (let i = 2; i < question.options.length; i++) {
            this.addOption();
        }

        this.questionForm.patchValue({
            question_type: question.question_type,
            question: question.question,
            options: question.options,
            correct_answer: question.correct_answer[0]
        });
    }

}
