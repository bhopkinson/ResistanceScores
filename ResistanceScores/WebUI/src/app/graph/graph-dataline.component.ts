import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-dataline',
  templateUrl: './graph-dataline.component.html',
  styleUrls: ['./graph-dataline.component.scss']
})
export class GraphDatalineComponent implements OnInit {

  @Input() public xData: number[];
  @Input() public yData: number[];

  public get isValid(): boolean {
    const xDataAndYDataHaveSameLength = this.xData.length === this.yData.length;

    return xDataAndYDataHaveSameLength;
  }

  ngOnInit() {
  }

}
