import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DeleteService } from './delete.service';

describe('DeleteService', () => {
  let service: DeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(DeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('validate fn', () => {
    service.setIdDelete(1);
    service.getIdDelete();
    service.getIsSuccesses();
    service.setIsSuccesses(true);
    service.handleError();
    expect(service).toBeTruthy();

  })
});
