import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDatalineComponent } from './graph-dataline.component';

describe('GraphDatalineComponent', () => {
  let component: GraphDatalineComponent;
  let fixture: ComponentFixture<GraphDatalineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDatalineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDatalineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
