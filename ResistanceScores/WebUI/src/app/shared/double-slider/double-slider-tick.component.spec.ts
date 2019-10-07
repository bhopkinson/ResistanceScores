import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSliderTickComponent } from './double-slider-tick.component';

describe('DoubleSliderTickComponent', () => {
  let component: DoubleSliderTickComponent;
  let fixture: ComponentFixture<DoubleSliderTickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleSliderTickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleSliderTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
