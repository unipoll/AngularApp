import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelComponent } from './cancel.component';

describe('DialogCancelComponent', () => {
  let component: DialogCancelComponent;
  let fixture: ComponentFixture<DialogCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
