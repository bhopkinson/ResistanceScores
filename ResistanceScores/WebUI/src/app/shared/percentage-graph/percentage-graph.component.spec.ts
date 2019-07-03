import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageGraphComponent } from './percentage-graph.component';

describe('PercentageGraphComponent', () => {
  let component: PercentageGraphComponent;
  let fixture: ComponentFixture<PercentageGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
