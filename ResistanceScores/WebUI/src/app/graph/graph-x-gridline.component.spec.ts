import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphXGridlineComponent } from './graph-x-gridline.component';

describe('GraphXGridlineComponent', () => {
  let component: GraphXGridlineComponent;
  let fixture: ComponentFixture<GraphXGridlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphXGridlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphXGridlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
