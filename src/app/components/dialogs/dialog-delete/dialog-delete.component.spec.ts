import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteComponent } from './dialog-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('DialogDeleteComponent', () => {
  let component: DialogDeleteComponent;
  let fixture: ComponentFixture<DialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule
      ],
      declarations: [ DialogDeleteComponent ],
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

    fixture = TestBed.createComponent(DialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
