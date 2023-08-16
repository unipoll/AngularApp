import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSetPolicyComponent } from './dialog-set-policy.component';

describe('DialogSetPolicyComponent', () => {
  let component: DialogSetPolicyComponent;
  let fixture: ComponentFixture<DialogSetPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSetPolicyComponent]
    });
    fixture = TestBed.createComponent(DialogSetPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
