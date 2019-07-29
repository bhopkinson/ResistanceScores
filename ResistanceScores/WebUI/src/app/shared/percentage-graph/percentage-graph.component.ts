import { Component, OnInit } from '@angular/core';
import { GraphClient, GraphPointDto, GraphPlayerDto } from '../../services/web-api.service.generated';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-percentage-graph',
  templateUrl: './percentage-graph.component.html',
  styleUrls: ['./percentage-graph.component.scss']
})
export class PercentageGraphComponent implements OnInit {

  constructor(private _graphClient: GraphClient) { }

  isLoading = true;
  errorOccurred = false;

  players: GraphPlayerDto[];

  ngOnInit() {
    this._graphClient.get()
      .pipe(take(1))
      .subscribe(
          data => {
            this.players = data;
            this.isLoading = false;
          },
          error => {
            this.errorOccurred = true;
          }
      )
  }
  xMin = 0;
  xMax = 75;
  yMin = 0;
  yMax = 100;
  xScale = 200;
  yScale = 100;
  xTickScale = 5;
  yTickScale = 5;
  xLabelScale = 4;
  yLabelScale = 3;

  xGridlines = [0, 10,20,30,40,50,60,70, 80, 90, 100];
  yGridlines = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  getWinPercentage(graphPoint: GraphPointDto): number {
    if (graphPoint.totalGames === 0) {
      return 0;
    }
    return 100 * graphPoint.wins / graphPoint.totalGames;
  }

  getWinPercentages(graphPlayer: GraphPlayerDto): number[] {
    if (isNullOrUndefined(graphPlayer)) {
      return [];
    }
    return graphPlayer.graphPoints.map(p => this.getWinPercentage(p));
  }

  getGameDates(graphPlayer: GraphPlayerDto): Date[] {
    if (isNullOrUndefined(graphPlayer)) {
      return [];
    }
    return graphPlayer.graphPoints.map(p => p.date);
  }

}
