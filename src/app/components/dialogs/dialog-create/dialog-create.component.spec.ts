import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateComponent } from './dialog-create.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogCreateComponent', () => {
  let component: DialogCreateComponent;
  let fixture: ComponentFixture<DialogCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogCreateComponent],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: {} 
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(DialogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
