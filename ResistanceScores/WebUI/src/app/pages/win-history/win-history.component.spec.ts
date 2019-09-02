import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinHistoryComponent } from './win-history.component';

describe('WinHistoryComponent', () => {
  let component: WinHistoryComponent;
  let fixture: ComponentFixture<WinHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
