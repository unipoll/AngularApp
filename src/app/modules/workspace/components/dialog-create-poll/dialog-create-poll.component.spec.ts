import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatePollComponent } from './dialog-create-poll.component';

describe('DialogCreatePollComponent', () => {
  let component: DialogCreatePollComponent;
  let fixture: ComponentFixture<DialogCreatePollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreatePollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCreatePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
