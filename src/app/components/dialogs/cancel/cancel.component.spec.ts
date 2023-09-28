import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelComponent } from './cancel.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('DialogCancelComponent', () => {
  let component: DialogCancelComponent;
  let fixture: ComponentFixture<DialogCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [ DialogCancelComponent ],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
