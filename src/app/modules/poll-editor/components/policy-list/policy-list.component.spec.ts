import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListComponent } from './policy-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PolicyListComponent', () => {
  let component: PolicyListComponent;
  let fixture: ComponentFixture<PolicyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [PolicyListComponent]
    });
    fixture = TestBed.createComponent(PolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
