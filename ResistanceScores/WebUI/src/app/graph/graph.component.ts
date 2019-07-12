import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { GraphXGridlineComponent } from './graph-x-gridline.component';
import { GraphYGridlineComponent } from './graph-y-gridline.component';
import { GraphDatalineComponent } from './graph-dataline.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @Input() public xMin: number;
  @Input() public xMax: number;
  @Input() public yMin: number;
  @Input() public yMax: number;

  @Input() public xScale: number;
  @Input() public yScale: number;

  @Input() public xTickScale: number = 0;
  @Input() public yTickScale: number = 0;

  @ContentChildren(GraphXGridlineComponent) xGridlines: QueryList<GraphXGridlineComponent>;
  @ContentChildren(GraphYGridlineComponent) yGridlines: QueryList<GraphYGridlineComponent>;
  @ContentChildren(GraphDatalineComponent) dataLines: QueryList<GraphDatalineComponent>;


  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this.xGridlines.forEach(o => console.log(o));

    setTimeout(() => this.xGridlines.forEach(o => console.log(o)), 2000);
  }

  public get viewBox(): string {
    return `0 0 ${this.xScale + this.xTickScale} ${this.yScale + this.xTickScale}`;
  }

  public get isValid(): boolean {
    const xMaxIsLargerThanXMin = this.xMax <= this.xMin;
    const yMaxIsLargerThanYMin = this.yMax <= this.yMin;
    const xScaleIsLargerThanZero = this.xScale > 0;
    const yScaleIsLargerThanZero = this.yScale > 0;

    const xGridlinesAreValid = this.xGridlines.toArray().every(dl => dl.isValid);
    const yGridlinesAreValid = this.yGridlines.toArray().every(dl => dl.isValid);
    const dataLinesAreValid = this.dataLines.toArray().every(dl => dl.isValid);


    return [
      xMaxIsLargerThanXMin,
      yMaxIsLargerThanYMin,
      xScaleIsLargerThanZero,
      yScaleIsLargerThanZero,
      xGridlinesAreValid,
      yGridlinesAreValid,
      dataLinesAreValid
    ].every(test => test === true);
  }

}
