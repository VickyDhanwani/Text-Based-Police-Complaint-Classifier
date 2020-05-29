/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportClassifyServiceService } from './report-classify-service.service';

describe('Service: ReportClassifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportClassifyServiceService]
    });
  });

  it('should ...', inject([ReportClassifyServiceService], (service: ReportClassifyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
