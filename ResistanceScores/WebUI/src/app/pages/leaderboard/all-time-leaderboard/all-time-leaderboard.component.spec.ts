import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeLeaderboardComponent } from './all-time-leaderboard.component';

describe('AllTimeLeaderboardComponent', () => {
  let component: AllTimeLeaderboardComponent;
  let fixture: ComponentFixture<AllTimeLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTimeLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTimeLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
