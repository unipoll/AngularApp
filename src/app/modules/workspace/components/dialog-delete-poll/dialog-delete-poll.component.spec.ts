import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletePollComponent } from './dialog-delete-poll.component';

describe('DialogDeletePollComponent', () => {
  let component: DialogDeletePollComponent;
  let fixture: ComponentFixture<DialogDeletePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeletePollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeletePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
