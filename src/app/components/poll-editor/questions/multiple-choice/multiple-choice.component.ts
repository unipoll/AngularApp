import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { QuestionModel } from 'src/app/models/question.model';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent {

  @Input() question_number: number = 0;
  // question_type: string = 'multiple-choice';
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  // Create a form group 
  questionForm = this.fb.group({
    question_type: ['multiple-choice'],
    question: this.fb.control(''),
    options: this.fb.array([
      this.fb.control(''),
      this.fb.control('')
    ]),
    correct_answer: ['']
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
    
    let qm: QuestionModel = {
      id: this.question_number,
      question_type: this.questionForm.value.question_type as string,
      question: this.questionForm.value.question as string,
      options: this.questionForm.value.options as string[],
      correct_answer: [parseInt(this.questionForm.value.correct_answer as string)] as number[]
    }

    return qm;
  }

}
