import { TestBed } from '@angular/core/testing';

import { GetTemplateService } from './get-template.service';

describe('GetTemplateService', () => {
  let service: GetTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
