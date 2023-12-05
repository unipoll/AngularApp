import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMemberListComponent } from './workspace-member-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material/material.module';

describe('WorkspaceMemberListComponent', () => {
  let component: WorkspaceMemberListComponent;
  let fixture: ComponentFixture<WorkspaceMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ WorkspaceMemberListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkspaceMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
