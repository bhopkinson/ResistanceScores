import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayReviewComponent } from './day-review.component';

describe('DayReviewComponent', () => {
  let component: DayReviewComponent;
  let fixture: ComponentFixture<DayReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
