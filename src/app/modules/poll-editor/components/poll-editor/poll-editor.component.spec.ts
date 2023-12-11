import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollEditorComponent } from './poll-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('PollEditorComponent', () => {
  let component: PollEditorComponent;
  let fixture: ComponentFixture<PollEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
        
      ],
      declarations: [PollEditorComponent]
    });
    fixture = TestBed.createComponent(PollEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
