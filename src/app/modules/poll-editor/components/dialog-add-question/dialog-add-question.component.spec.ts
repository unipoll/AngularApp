import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddQuestionComponent } from './dialog-add-question.component';
import { MaterialModule } from '../../../material/material.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddQuestionComponent', () => {
  let component: DialogAddQuestionComponent;
  let fixture: ComponentFixture<DialogAddQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogAddQuestionComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(DialogAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
