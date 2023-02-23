import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceListComponent } from './workspace-list.component';
import {} from 'jasmine';

describe('WorkspaceListComponent', () => {
  let component: WorkspaceListComponent;
  let fixture: ComponentFixture<WorkspaceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
