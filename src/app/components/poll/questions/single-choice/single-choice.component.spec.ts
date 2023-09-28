import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceComponent } from './single-choice.component';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { QuestionModule } from '../question.module';

describe('SingleChoiceComponent', () => {
  let component: SingleChoiceComponent;
  let fixture: ComponentFixture<SingleChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MarkdownModule.forRoot(),
      ],
      declarations: [SingleChoiceComponent],
    });
    fixture = TestBed.createComponent(SingleChoiceComponent);
    component = fixture.componentInstance;
    component.question = {
      id: 1,
      question_type: 'single-choice',
      question: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green', 'Yellow'],
      correct_answer: [1]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
