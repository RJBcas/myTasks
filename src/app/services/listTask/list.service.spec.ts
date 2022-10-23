import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LIST_TASK_MOCK } from 'src/app/modules/task/mocks/listTask.mock';

import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Validate Fn', () => {
    service.getDataList();
    service.setDataList(LIST_TASK_MOCK)
    service.handleError();
    expect(service).toBeTruthy();
  })
});
