import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graph-dataline',
  template: ''
})
export class GraphDatalineComponent implements OnInit  {

  constructor(private elRef: ElementRef) {}

  @Input() public xData: number[];
  @Input() public yData: number[];

  public classes: string;

  public get isValid(): boolean {
    const xDataAndYDataSameLength = this.xData.length === this.yData.length;
    return xDataAndYDataSameLength;
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
