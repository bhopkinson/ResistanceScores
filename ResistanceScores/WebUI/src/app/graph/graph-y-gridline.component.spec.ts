import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphYGridlineComponent } from './graph-y-gridline.component';

describe('GraphYGridlineComponent', () => {
  let component: GraphYGridlineComponent;
  let fixture: ComponentFixture<GraphYGridlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphYGridlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphYGridlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
