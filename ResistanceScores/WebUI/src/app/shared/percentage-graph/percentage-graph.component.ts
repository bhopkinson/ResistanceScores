import { Component, OnInit } from '@angular/core';
import { GraphClient, GraphDto } from '../../services/web-api.service.generated';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-percentage-graph',
  templateUrl: './percentage-graph.component.html',
  styleUrls: ['./percentage-graph.component.scss']
})
export class PercentageGraphComponent implements OnInit {

  constructor(private _graphClient: GraphClient) { }

  isLoading = true;
  errorOccurred = false;

  graphData: GraphDto;

  ngOnInit() {
    this._graphClient.get()
      .pipe(take(1))
      .subscribe(
          data => {
            this.graphData = data;
            this.isLoading = false;
          },
          error => {
            this.errorOccurred = true;
          }
      )
  }
  xMin = 0;
  xMax = 75;
  yMin = 20;
  yMax = 100;
  xScale = 200;
  yScale = 100;
  xTickScale = 5;
  yTickScale = 5;
  xLabelScale = 4;
  yLabelScale = 3;

  xGridlines = [0, 10,20,30,40,50,60,70, 80, 90, 100];
  yGridlines = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  xData = [1, 2, 3, 4];

  get yData(): number[] {
    return [30,70,20,40]
  }


  public get firstDataline(): { xData: number[], yData: number[] } {
    if (this.graphData === undefined) return { xData: [], yData: [] };
    const xData = this.graphData.graphPlayers[0].graphPoints.map(gp => 100 * gp.wins / gp.totalGames);
    const yData = this.graphData.graphPlayers[0].graphPoints.map(gp => gp.totalGames);
    return {xData: xData, yData: yData}
  }

}
