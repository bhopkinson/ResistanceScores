import { Component, OnInit } from '@angular/core';
import { GraphClient, GraphPointDto, GraphPlayerDto } from '../../services/web-api.service.generated';
import { take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-percentage-graph',
  templateUrl: './percentage-graph.component.html',
  styleUrls: ['./percentage-graph.component.scss']
})
export class PercentageGraphComponent implements OnInit {

  private DEGREES_IN_A_CIRCLE = 360;
  private NUMBER_OF_X_GRIDLINES = 10;
  private NUMBER_OF_Y_GRIDLINES = 10;

  constructor(private _graphClient: GraphClient, private _dateService: DateService) { }

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
  xMin = 90;
  xMax = 240;
  yMin = 0;
  yMax = 100;
  xScale = 200;
  yScale = 100;
  xTickScale = 5;
  yTickScale = 5;
  xLabelScale = 4;
  yLabelScale = 3;

  get xGridlines(): number[] {
    const xRange = this.xMax - this.xMin;
    const xDiff = xRange / this.NUMBER_OF_X_GRIDLINES;
    let xCoord = this.xMin;
    const gridlines = [this.xMin];
    for (var i = 0; i < this.NUMBER_OF_X_GRIDLINES; i++) {
      xCoord += xDiff;
      gridlines.push(xCoord);
    }
    return gridlines;
  }

  get yGridlines(): number[] {
    const yRange = this.yMax - this.yMin;
    const yDiff = yRange / this.NUMBER_OF_Y_GRIDLINES;
    let yCoord = this.yMin;
    const gridlines = [this.yMin];
    for (var i = 0; i < this.NUMBER_OF_Y_GRIDLINES; i++) {
      yCoord += yDiff;
      gridlines.push(yCoord);
    }
    return gridlines;
  }

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

  getRelativeDays(graphPlayer: GraphPlayerDto): number[] {
    if (isNullOrUndefined(graphPlayer)) {
      return [];
    }
    return graphPlayer.graphPoints.map(o => this.getDaysSinceJan1st2019(o.date));
  }

  getDaysSinceJan1st2019(date: Date): number {
    return this._dateService.getRelativeDay(date);
  }

  getHue(index: number): number { // TODO - TH - Move this out of here, make it generic
    const playerCount = this.playerCount;

    if (playerCount === 0) {
      return 0;
    }

    return this.DEGREES_IN_A_CIRCLE * (index / playerCount);
  }

  private get playerCount(): number {
    if (isNullOrUndefined(this.players)) {
      return 0
    }
    return this.players.length;
  }

}
