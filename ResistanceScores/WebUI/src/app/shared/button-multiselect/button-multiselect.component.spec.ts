import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMultiselectComponent } from './button-multiselect.component';

describe('ButtonMultiselectComponent', () => {
  let component: ButtonMultiselectComponent;
  let fixture: ComponentFixture<ButtonMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
