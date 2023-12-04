import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacePolicyListComponent } from './workspace-policy-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WorkspacePolicyListComponent', () => {
  let component: WorkspacePolicyListComponent;
  let fixture: ComponentFixture<WorkspacePolicyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [WorkspacePolicyListComponent]
    });
    fixture = TestBed.createComponent(WorkspacePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
