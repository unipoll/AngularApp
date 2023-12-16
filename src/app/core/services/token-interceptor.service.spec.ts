import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../modules/material/material.module';

describe('TokenInterceptorService', () => {
    let service: TokenInterceptorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                MaterialModule
            ],
        });
        service = TestBed.inject(TokenInterceptorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
