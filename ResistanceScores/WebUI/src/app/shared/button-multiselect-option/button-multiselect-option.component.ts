import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-button-multiselect-option',
  template: `<button
                class="btn"
                [ngClass]="selected ? cssSelected : cssUnselected"
                (click)="select()">
                  <ng-content></ng-content>
              </button>`,
  styleUrls: ['./button-multiselect-option.component.scss']
})
export class ButtonMultiselectOptionComponent {
  @Input() value: number;
  @Input() selected = false;

  @Input() cssUnselected = '';
  @Input() cssSelected = '';

  change$ = new Subject<void>();

  select(): void {
    this.selected = !this.selected;
    this.change$.next();
  }
}
