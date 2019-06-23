import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMultiselectOptionComponent } from './button-multiselect-option.component';

describe('ButtonMultiselectOptionComponent', () => {
  let component: ButtonMultiselectOptionComponent;
  let fixture: ComponentFixture<ButtonMultiselectOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonMultiselectOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonMultiselectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
