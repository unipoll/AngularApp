import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteWorkspaceComponent } from './dialog-delete-workspace.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../material/material.module';

describe('DialogDeleteWorkspaceComponent', () => {
  let component: DialogDeleteWorkspaceComponent;
  let fixture: ComponentFixture<DialogDeleteWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule
      ],
      declarations: [ DialogDeleteWorkspaceComponent ],
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

    fixture = TestBed.createComponent(DialogDeleteWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
