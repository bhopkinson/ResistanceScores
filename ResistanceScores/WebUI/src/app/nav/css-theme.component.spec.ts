import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssThemeComponent } from './css-theme.component';

describe('CssThemeComponent', () => {
  let component: CssThemeComponent;
  let fixture: ComponentFixture<CssThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CssThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CssThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
