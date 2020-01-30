import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-double-slider-label',
  template: ''
})
export class DoubleSliderLabelComponent {
  @Input() value = 0;
  @Input() text = '';
}
