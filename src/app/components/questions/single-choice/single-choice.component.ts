import { I } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

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
    question: [''],
    options: this.fb.array([
      this.fb.control(''),
      this.fb.control('')
    ])
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
    return this.questionForm.value;
  }

}
