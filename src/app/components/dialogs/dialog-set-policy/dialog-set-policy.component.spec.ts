import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSetPolicyComponent } from './dialog-set-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogSetPolicyComponent', () => {
  let component: DialogSetPolicyComponent;
  let fixture: ComponentFixture<DialogSetPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [DialogSetPolicyComponent],
      providers: [
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: {
            policy: {
              id: 1,
              name: 'Test',
              permissions: ['read', 'write', 'delete']
            },
            allPermissions: ['read', 'write', 'delete', 'create']
          } 
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(DialogSetPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
