import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { copyClassesAndStyles } from '../shared/functions';

@Component({
  selector: 'app-graph-dataline',
  template: ''
})
export class GraphDatalineComponent implements OnInit  {

  constructor(_elRef: ElementRef) { this.elRef = _elRef }

  @Input() public xData: number[] = [];
  @Input() public yData: number[] = [];
  @Input() public hue: number;

  public classes: string;
  public styles: string;
  public elRef: ElementRef;

  public get isValid(): boolean {
    const xDataAndYDataSameLength = this.xData.length === this.yData.length;
    return xDataAndYDataSameLength;
  }

  ngOnInit() {
    copyClassesAndStyles(this);
  }
}
