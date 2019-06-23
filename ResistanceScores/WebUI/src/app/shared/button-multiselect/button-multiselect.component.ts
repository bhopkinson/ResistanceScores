import { Component, OnInit, Input, Renderer2, ElementRef, ViewChildren, QueryList, AfterViewInit, ContentChildren, OnDestroy, forwardRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { ControlValueAccessor, SelectControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonMultiselectOptionComponent } from '../button-multiselect-option/button-multiselect-option.component';
import { combineAll, combineLatest, takeUntil } from 'rxjs/operators';
import { concat, Subject } from 'rxjs';

@Component({
  selector: 'app-button-multiselect',
  template: '<ng-content></ng-content>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ButtonMultiselectComponent),
    }
  ]
})
export class ButtonMultiselectComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
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

  writeValue(value: number[]): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
    this.options
      .filter(o => value.includes(o.value))
      .forEach(o => o.selected = true);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void { }

  @ContentChildren(ButtonMultiselectOptionComponent)
  options: QueryList<ButtonMultiselectOptionComponent> = new QueryList<ButtonMultiselectOptionComponent>();

  public get items(): number[] {
    return this.options.map(o => o.value);
  }

  public get selectedItems(): number[] {
    return this.options.filter(o => o.selected).map(o => o.value);
  }

  private _addChangeListeners(): void {
    this.options.forEach(o => {
      o.change$
        .pipe(takeUntil(this._destroy$))
        .subscribe(_ => {
          this.writeValue(this.selectedItems);
          this._onChange(this.selectedItems);
        });
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
