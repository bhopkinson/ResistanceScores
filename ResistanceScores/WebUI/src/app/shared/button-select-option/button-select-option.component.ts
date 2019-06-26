import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-button-select-option',
  template: `<ng-content></ng-content>`,
})
export class ButtonSelectOptionComponent {

  @Input() value: number;
  
  @Input() @HostBinding('class.selected') selected = false;

  change$ = new Subject<void>();

  @HostListener('click')
  select(): void {
    if (!this.selected) {
      this.selected = true;
      this.change$.next();
    }
  }
}
