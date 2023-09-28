import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snackbar.service';
import { MaterialModule } from '../modules/material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatSnackBarModule
      ],
      providers: [SnackBarService]
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
