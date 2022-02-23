import { TestBed } from '@angular/core/testing';

import { GetTotalBudgetService } from './get-total-budget.service';

describe('GetTotalBudgetService', () => {
  let service: GetTotalBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTotalBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
