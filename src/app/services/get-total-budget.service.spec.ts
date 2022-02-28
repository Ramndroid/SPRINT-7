import { TestBed } from '@angular/core/testing';

import { BudgetsService } from './get-total-budget.service';

describe('GetTotalBudgetService', () => {
  let service: BudgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
