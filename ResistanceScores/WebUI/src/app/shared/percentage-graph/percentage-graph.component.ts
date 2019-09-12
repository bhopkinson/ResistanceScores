import { Component, OnInit } from '@angular/core';
import { GraphClient, GraphPointDto, GraphPlayerDto, PlayerClient } from '../../services/web-api.service.generated';
import { take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { DateService } from 'src/app/services/date.service';
import { PlayerListingDto } from 'src/app/web-api.service.generated';

@Component({
  selector: 'app-percentage-graph',
  templateUrl: './percentage-graph.component.html',
  styleUrls: ['./percentage-graph.component.scss']
})
export class PercentageGraphComponent implements OnInit {

  private DEGREES_IN_A_CIRCLE = 360;
  private NUMBER_OF_X_GRIDLINES = 10;
  private NUMBER_OF_Y_GRIDLINES = 10;

  private DATALINE_HSL_SATURATION = '50%';
  private DATALINE_HSL_LUMINOSITY = '50%';

  private UNKNOWN_PLAYER_INITIALS_STRING = '???';

  constructor(private _graphClient: GraphClient, private _playerClient: PlayerClient, private _dateService: DateService) { }

  get isLoading() { return this.arePlayersLoading || this.arePlayerDetailssLoading };
  arePlayersLoading = true;
  arePlayerDetailssLoading = true;
  errorOccurred = false;

  players: GraphPlayerDto[];
  playerDetails: PlayerListingDto[];
  hiddenPlayers: number[] = [];

  ngOnInit() {
    this._graphClient.get()
      .pipe(take(1))
      .subscribe(
          data => {
            this.players = data;
            this.arePlayersLoading = false;
          },
          error => {
            this.errorOccurred = true;
          }
    )
    this._playerClient.getPlayers()
      .pipe(take(1))
      .subscribe(
        data => {
          this.playerDetails = data;
          this.arePlayerDetailssLoading = false;
        },
        error => {
          this.errorOccurred = true;
        }
      )
  }

  xMin = this.oneWeekAgoToday;
  xMax = this.today;
  yMin = 0;
  yMax = 100;
  xScale = 200;
  yScale = 100;
  xTickScale = 5;
  yTickScale = 5;
  xLabelScale = 4;
  yLabelScale = 3;

  get xMinAsDate(): Date {
    return this._dateService.getDateFromRelativeDay(this.xMin);
  }

  set xMinAsDate(date: Date) {
    this.xMin = this._dateService.getRelativeDay(new Date(date));
  }

  get xMaxAsDate(): Date {
    return this._dateService.getDateFromRelativeDay(this.xMax);
  }

  set xMaxAsDate(date: Date) {
    this.xMax = this._dateService.getRelativeDay(new Date(date))
  }

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

  get visiblePlayers(): GraphPlayerDto[] {
    return this.players.filter(p => !this.hiddenPlayers.includes(p.playerId));
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

  getColour(index: number): string {
    const hue = this.getHue(index);
    return `hsl(${hue},${this.DATALINE_HSL_SATURATION},${this.DATALINE_HSL_LUMINOSITY})`;
  }

  getHue(id: number): number { // TODO - TH - Move this out of here, make it generic
    const playerCount = this.playerCount;
    const index = this.playerDetails.map(p => p.id).indexOf(id);

    if (playerCount === 0) {
      return 0;
    }

    return this.DEGREES_IN_A_CIRCLE * (index / playerCount);
  }

  getInitials(id: number): string { // TODO - TH - Move this to a new player service
    const players = this.playerDetails.filter(pd => pd.id === id);
    if (players.length === 1) {
      const player = players[0];
      return player.initials
    }
    return this.UNKNOWN_PLAYER_INITIALS_STRING;
  }

  getXLabel(relativeDay: number): Date {
    return this._dateService.getDateFromRelativeDay(relativeDay);
  }

  isHidden(id: number): boolean {
    return this.hiddenPlayers.includes(id);
  }

  togglePlayerVisibility(id: number): void {
    if (this.isHidden(id)) {
      this.hiddenPlayers = this.hiddenPlayers.filter(hp => hp !== id);
    } else {
      this.hiddenPlayers.push(id);
    }
  }

  private get playerCount(): number {
    if (isNullOrUndefined(this.playerDetails)) {
      return 0
    }
    return this.playerDetails.length;
  }

  private get oneWeekAgoToday(): number {
    const date = this._dateService.oneWeekAgoToday;
    return this._dateService.getRelativeDay(date);
  }

  private get today(): number {
    const date = this._dateService.today;
    return this._dateService.getRelativeDay(date);
  }

}
