import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOrTableViewComponent } from './grid-or-table-view.component';

describe('GridOrTableViewComponent', () => {
  let component: GridOrTableViewComponent;
  let fixture: ComponentFixture<GridOrTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridOrTableViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridOrTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
