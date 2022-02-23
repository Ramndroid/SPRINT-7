import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityButtonsComponent } from './quantity-buttons.component';

describe('QuantityButtonsComponent', () => {
  let component: QuantityButtonsComponent;
  let fixture: ComponentFixture<QuantityButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
