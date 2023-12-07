import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewPolicyComponent } from './dialog-view-policy.component';

describe('DialogViewPolicyComponent', () => {
  let component: DialogViewPolicyComponent;
  let fixture: ComponentFixture<DialogViewPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogViewPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogViewPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
