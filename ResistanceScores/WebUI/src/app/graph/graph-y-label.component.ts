import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graph-y-label',
  template: ''
})
export class GraphYLabelComponent implements OnInit  {

  constructor(private elRef: ElementRef) {}

  @Input() public y: number;
  @Input() public text: string;

  @Input() public xScaleOffset = 0;
  @Input() public yScaleOffset = 0;

  public classes: string;

  public get isValid(): boolean {
    return true;
  }

  ngOnInit() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        this.classes = (mutation.target as HTMLElement).classList.value;
      });
    });
    const config = { attributes: true, childList: false, characterData: false };

    observer.observe(this.elRef.nativeElement, config);
  }
}
