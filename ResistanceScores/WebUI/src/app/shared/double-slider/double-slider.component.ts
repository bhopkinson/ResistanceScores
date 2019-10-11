import { Component, OnInit, Input, ContentChildren, QueryList, Output, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';
import { DoubleSliderLabelComponent } from './double-slider-label.component';
import { DoubleSliderTickComponent } from './double-slider-tick.component';

@Component({
  selector: 'app-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss']
})
export class DoubleSliderComponent {
  constructor(private _el: ElementRef) { }

  @ContentChildren(DoubleSliderLabelComponent) labels: QueryList<DoubleSliderLabelComponent>;
  @ContentChildren(DoubleSliderTickComponent) ticks: QueryList<DoubleSliderTickComponent>;

  _leftValue = 2;
  _rightValue = 5;

  _isDraggingLeft = false;
  _isDraggingRight = false;
  get _isDragging(): boolean { return this._isDraggingLeft || this._isDraggingRight };

  get leftValue(): number { return this._leftValue; }
  get rightValue(): number { return this._rightValue; }

  get leftCoordinate(): number { return this.getCoordinateFromValue(this._leftValue); }
  get rightCoordinate(): number { return this.getCoordinateFromValue(this._rightValue); }

  @Input('leftValue')
  set leftValue(value: number) {
    this._leftValue = value;
    this.leftValueChange.emit(value);
  };

  @Input('rightValue')
  set rightValue(value: number) {
    this._rightValue = value;
    this.rightValueChange.emit(value);
  };

  @HostListener('touchmove', ['$event'])
  onMove(event: any): void {
    if (event.touches.length > 0) {
      const touch = event.touches.item(0);
      this.onPointerMove(touch);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.onPointerMove(event);
  }

  private onPointerMove(event: {clientX: number}): void {
    const newValue = Math.round(this.getValueFromCoordinate(event.clientX));
    if (this._isDraggingLeft) {
      if (newValue <= this.rightValue - 1  && newValue >= this.min) {
        this.leftValue = newValue;
      }
    }
    if (this._isDraggingRight) {
      if (newValue >= this.leftValue + 1 && newValue >= this.max) {
        this.rightValue = newValue;
      }
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: any): void {
    if (event.touches.length > 0) {
      const touch = event.touches.item(0);
      this.onPointerDown(touch);
    }
  }

  @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
    this.onPointerDown(event);
  }

  private onPointerDown(event: {clientX: number}): void {
    const distanceFromLeft = Math.abs(event.clientX - this.leftCoordinate);
    const distanceFromRight = Math.abs(event.clientX - this.rightCoordinate);
    if (distanceFromLeft < distanceFromRight) {
      this._isDraggingLeft = true;
    } else {
      this._isDraggingRight = true;
    }
    this.onPointerMove(event);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  onDragEnd(): void {
    this._isDraggingLeft = false; this._isDraggingRight = false; 
  }

  public get clientLeft() { return this._el.nativeElement.getBoundingClientRect().left; }
  public get clientRight() { return this._el.nativeElement.getBoundingClientRect().right; }

  @Output() leftValueChange = new EventEmitter<number>();
  @Output() rightValueChange = new EventEmitter<number>();

  @Input() min = 0;
  @Input() max = 7;

  getPercentage(value: number): number {
    const result = 100 * (value - this.min) / (this.max - this.min);
    return result;
  }

  getValueFromCoordinate(coordinate: number): number {
    let relativeCoord = (coordinate - this.clientLeft) / (this.clientRight - this.clientLeft);
    return this.min + (relativeCoord * (this.max - this.min));
  }

  getCoordinateFromValue(value: number): number {
    let relativeValue = (value - this.min) / (this.max - this.min);
    return this.clientLeft + (relativeValue * (this.clientRight - this.clientLeft));
  }

}


// import { Component, OnInit, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
// import { DoubleSliderLabelComponent } from './double-slider-label.component';
// import { DoubleSliderTickComponent } from './double-slider-tick.component';

// @Component({
//   selector: 'app-double-slider',
//   templateUrl: './double-slider.component.html',
//   styleUrls: ['./double-slider.component.scss']
// })
// export class DoubleSliderComponent {
//   @ContentChildren(DoubleSliderLabelComponent) labels: QueryList<DoubleSliderLabelComponent>;
//   @ContentChildren(DoubleSliderTickComponent) ticks: QueryList<DoubleSliderTickComponent>;

//   _leftValue = 2;
//   _rightValue = 5;

//   get leftValue(): number {return this._leftValue;}
//   get rightValue(): number {return this._rightValue;}

//   @Input('leftValue')
//   set leftValue(value: number) {
//     this._leftValue = value;
//     this.leftValueChange.emit(value);
//   };

//   @Input('rightValue')
//   set rightValue(value: number) {
//     this._rightValue = value;
//     this.rightValueChange.emit(value);
//   };

//   @Output() leftValueChange = new EventEmitter<number>();
//   @Output() rightValueChange = new EventEmitter<number>();

//   @Input() min = 0;
//   @Input() max = 7;

//   getPercentage(value: number): number {
//     const result = 100 * (value - this.min) / (this.max - this.min);
//     return result;
//   }

// }
