import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceComponent } from './single-choice.component';
import { MarkdownModule } from 'ngx-markdown';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SingleChoiceComponent', () => {
  let component: SingleChoiceComponent;
  let fixture: ComponentFixture<SingleChoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot()
      ],
      declarations: [SingleChoiceComponent]
    });
    fixture = TestBed.createComponent(SingleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
