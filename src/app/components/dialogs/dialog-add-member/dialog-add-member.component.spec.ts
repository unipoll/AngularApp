import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddMemberComponent } from './dialog-add-member.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddMemberComponent', () => {
  let component: DialogAddMemberComponent;
  let fixture: ComponentFixture<DialogAddMemberComponent>;

  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogAddMemberComponent],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: {
            accountList: []
          }
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(DialogAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
