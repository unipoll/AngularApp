import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPolicyComponent } from './dialog-add-policy.component';

describe('DialogAddPolicyComponent', () => {
  let component: DialogAddPolicyComponent;
  let fixture: ComponentFixture<DialogAddPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddPolicyComponent]
    });
    fixture = TestBed.createComponent(DialogAddPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
