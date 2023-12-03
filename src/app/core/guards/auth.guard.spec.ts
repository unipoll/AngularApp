import { TestBed } from '@angular/core/testing';

import { requireAccount, guestOnly } from './auth.guard';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../modules/material/material.module';

describe('AuthGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
      ],
    });
  });
});
