import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakTableComponent } from './streak-table.component';

describe('StreakTableComponent', () => {
  let component: StreakTableComponent;
  let fixture: ComponentFixture<StreakTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreakTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreakTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
