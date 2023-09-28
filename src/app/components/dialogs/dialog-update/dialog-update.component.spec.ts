import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateComponent } from './dialog-update.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogUpdateComponent', () => {
  let component: DialogUpdateComponent;
  let fixture: ComponentFixture<DialogUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogUpdateComponent],
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
    fixture = TestBed.createComponent(DialogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
