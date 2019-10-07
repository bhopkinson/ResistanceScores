import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleSliderLabelComponent } from './double-slider-label.component';

describe('DoubleSliderLabelComponent', () => {
  let component: DoubleSliderLabelComponent;
  let fixture: ComponentFixture<DoubleSliderLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleSliderLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleSliderLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
