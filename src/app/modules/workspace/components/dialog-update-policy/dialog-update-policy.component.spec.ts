import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdatePolicyComponent } from './dialog-update-policy.component';

describe('DialogUpdatePolicyComponent', () => {
  let component: DialogUpdatePolicyComponent;
  let fixture: ComponentFixture<DialogUpdatePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdatePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUpdatePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
