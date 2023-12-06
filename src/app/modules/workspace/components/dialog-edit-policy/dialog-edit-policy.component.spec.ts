import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPolicyComponent } from './dialog-edit-policy.component';

describe('DialogEditPolicyComponent', () => {
  let component: DialogEditPolicyComponent;
  let fixture: ComponentFixture<DialogEditPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
