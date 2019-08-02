import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { GraphXGridlineComponent } from './graph-x-gridline.component';
import { GraphYGridlineComponent } from './graph-y-gridline.component';
import { GraphDatalineComponent } from './graph-dataline.component';
import { GraphXTickComponent } from './graph-x-tick.component';
import { GraphYTickComponent } from './graph-y-tick.component';
import { GraphXLabelComponent } from './graph-x-label.component';
import { GraphYLabelComponent } from './graph-y-label.component';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  private DATALINE_HSL_SATURATION = '50%';
  private DATALINE_HSL_LUMINOSITY = '50%';

  @Input() public xMin: number;
  @Input() public xMax: number;
  @Input() public yMin: number;
  @Input() public yMax: number;

  @Input() public xScale: number;
  @Input() public yScale: number;

  @Input() public xTickScale = 0;
  @Input() public yTickScale = 0;

  @Input() public xLabelScale = 0;
  @Input() public yLabelScale = 0;

  @Input() public id: string;
  private _fallbackId = Math.random().toString();

  @ContentChildren(GraphXGridlineComponent) xGridlines: QueryList<GraphXGridlineComponent>;
  @ContentChildren(GraphYGridlineComponent) yGridlines: QueryList<GraphYGridlineComponent>;
  @ContentChildren(GraphXTickComponent) xTicks: QueryList<GraphXTickComponent>;
  @ContentChildren(GraphYTickComponent) yTicks: QueryList<GraphYTickComponent>;
  @ContentChildren(GraphXLabelComponent) xLabels: QueryList<GraphXLabelComponent>;
  @ContentChildren(GraphYLabelComponent) yLabels: QueryList<GraphYLabelComponent>;
  @ContentChildren(GraphDatalineComponent) datalines: QueryList<GraphDatalineComponent>;

  public ngOnInit() {
  }

  public xValueToCoord(value: number): number {
    return (value - this.xMin) * this.xScale / (this.xMax - this.xMin);
  }

  public yValueToCoord(value: number): number {
    return (this.yMax - value) * this.yScale / (this.yMax - this.yMin);
  }

  public xValuesToCoords(values: number[]): number[] {
    return values.map(value => this.xValueToCoord(value));
  }

  public yValuesToCoords(values: number[]): number[] {
    return values.map(value => this.yValueToCoord(value));
  }

  public coordsToPolylinePoints(coordsArray: {x: number; y: number}[]): string {
    return coordsArray
      .map(coords => `${coords.x},${coords.y}`)
      .join(' ');
  }

  public xyZip(xCoords: number[], yCoords: number[]): {x: number; y: number}[] {
    if (xCoords.length !== yCoords.length) {
      return [];
    }
    return xCoords.map((xCoord, i) => {
      return {x: xCoord, y: yCoords[i] };
    });
  }

  public get clipPathId(): string {
    const id = this.id || this._fallbackId;
    return `th-clip-path-${id}`;
  }

  public get viewBox(): string {
    return `0 0 ${this.xScale + this.xTickScale} ${this.yScale + this.yTickScale}`;
  }

  public getColour(hue: number): string {
    return `hsl(${hue},${this.DATALINE_HSL_SATURATION},${this.DATALINE_HSL_LUMINOSITY})`;
  }

  public get isValid(): boolean {
    return this.validationMessages.length > 0;
  }

  public get validationMessages(): string[] {
    const idIsUndefined = this.id !== undefined;

    const xMaxIsLargerThanXMin = this.xMax <= this.xMin;
    const yMaxIsLargerThanYMin = this.yMax <= this.yMin;
    const xScaleIsLargerThanZero = this.xScale > 0;
    const yScaleIsLargerThanZero = this.yScale > 0;

    const asManyXTicksAsXGridlines = this.xTicks.length === this.xGridlines.length;
    const asManyYTicksAsYGridlines = this.yTicks.length === this.yGridlines.length;

    const asManyXLabelsAsXGridlines = this.xLabels.length === this.xGridlines.length;
    const asManyYLabelsAsYGridlines = this.yLabels.length === this.yGridlines.length;

    const xGridlinesAreValid = this.xGridlines.toArray().every(o => o.isValid);
    const yGridlinesAreValid = this.yGridlines.toArray().every(o => o.isValid);
    const xTicksAreValid = this.xTicks.toArray().every(o => o.isValid);
    const yTicksAreValid = this.yTicks.toArray().every(o => o.isValid);
    const dataLinesAreValid = this.datalines.toArray().every(o => o.isValid);

    const validationMessages: string[] = [];

    if (idIsUndefined) validationMessages.push('Id must be defined');
    if (xMaxIsLargerThanXMin) validationMessages.push('Atrribute "xMax" must be larger than attribute "xMin".');
    if (yMaxIsLargerThanYMin) validationMessages.push('Atrribute "yMax" must be larger than attribute "yMin".');
    if (xScaleIsLargerThanZero) validationMessages.push('Atrribute "xScale" must be above 0.');
    if (yScaleIsLargerThanZero) validationMessages.push('Atrribute "yScale" must be above 0.');
    if (asManyXTicksAsXGridlines) validationMessages.push('The number of "app-graph-x-tick" elements must match the number of "app-graph-x-gridline" elements.');
    if (asManyYTicksAsYGridlines) validationMessages.push('The number of "app-graph-y-tick" elements must match the number of "app-graph-y-gridline" elements.');
    if (asManyXLabelsAsXGridlines) validationMessages.push('The number of "app-graph-x-label" elements must match the number of "app-graph-x-gridline" elements.');
    if (asManyYLabelsAsYGridlines) validationMessages.push('The number of "app-graph-y-label" elements must match the number of "app-graph-y-gridline" elements.');

    return validationMessages;
  }

}
