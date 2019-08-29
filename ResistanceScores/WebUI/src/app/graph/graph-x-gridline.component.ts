import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graph-x-gridline',
  template: ''
})
export class GraphXGridlineComponent implements OnInit  {

  constructor(private elRef: ElementRef) {}

  @Input() public x: number;

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
