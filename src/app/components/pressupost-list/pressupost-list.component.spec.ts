import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressupostListComponent } from './pressupost-list.component';

describe('PressupostListComponent', () => {
  let component: PressupostListComponent;
  let fixture: ComponentFixture<PressupostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressupostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressupostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
