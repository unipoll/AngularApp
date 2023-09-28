import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceComponent } from './multiple-choice.component';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MarkdownModule.forRoot()
      ],
      declarations: [MultipleChoiceComponent],
    });
    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    component.question = {
      id: 1,
      question_type: 'multiple-choice',
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
