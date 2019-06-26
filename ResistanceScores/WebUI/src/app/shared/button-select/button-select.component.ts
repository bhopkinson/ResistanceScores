import { Component, OnInit, Input, Renderer2, ElementRef, ViewChildren, QueryList, AfterViewInit, ContentChildren, OnDestroy, forwardRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ControlValueAccessor, SelectControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonMultiselectOptionComponent } from '../button-multiselect-option/button-multiselect-option.component';
import { combineAll, combineLatest, takeUntil } from 'rxjs/operators';
import { concat, Subject } from 'rxjs';
import { ButtonSelectOptionComponent } from '../button-select-option/button-select-option.component';

@Component({
  selector: 'app-button-select',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ButtonSelectComponent),
    }
  ]
})
export class ButtonSelectComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  constructor(_renderer: Renderer2, _elementRef: ElementRef) {
    this._renderer = _renderer;
    this._elementRef = _elementRef;
  };

  ngAfterViewInit(): void {
    this._addChangeListeners();

    this.options.changes
      .pipe(takeUntil(this._destroy$))
      .subscribe(_ => this._addChangeListeners())
  }

  private _onChange = (value: any) => { };
  private _onTouched;
  private _renderer;
  private _elementRef;
  private _destroy$ = new Subject();

  writeValue(value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    this.options
      .filter(o => o.value === value)
      .forEach(o => o.select());
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void { }

  @ContentChildren(ButtonSelectOptionComponent)
  options: QueryList<ButtonSelectOptionComponent> = new QueryList<ButtonSelectOptionComponent>();

  private _addChangeListeners(): void {
    this.options.forEach(o => {
      o.change$
        .pipe(takeUntil(this._destroy$))
        .subscribe(_ => {
          this.deselectAllExcept(o.value);
          this.writeValue(o.value);
          this._onChange(o.value);
        });
    })
  }

  private deselectAllExcept(value: any) {
    this.options
      .filter(o => o.value !== value)
      .forEach(o => o.selected = false);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
