import { TestBed } from '@angular/core/testing';

import { PollEditorServiceService } from './poll-editor-service.service';

describe('PollEditorServiceService', () => {
  let service: PollEditorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollEditorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
