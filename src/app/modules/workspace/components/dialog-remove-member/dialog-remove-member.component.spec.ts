import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveMemberComponent } from './dialog-remove-member.component';

describe('DialogRemoveMemberComponent', () => {
  let component: DialogRemoveMemberComponent;
  let fixture: ComponentFixture<DialogRemoveMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRemoveMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRemoveMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
