import { Component, OnInit } from '@angular/core';
import { GraphClient, GraphPointDto, GraphPlayerDto, PlayerClient, Team, Timescale, Role } from '../../services/web-api.service.generated';
import { take, first } from 'rxjs/operators';
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

  Team = Team;
  Timescale = Timescale;

  private _teamFilter = Team.None;
  private _timescaleFilter = Timescale.AllTime;
  private _noOfPlayersFilter = 4;

  ngOnInit() {
    this._graphClient.get(Team.None, Timescale.AllTime, 4, 0, Role.None)
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

  get allPlayersSelected(): boolean {
    return this.hiddenPlayers.length === 0;
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

  toggleAllPlayerVisibilities(): void {
    if (this.allPlayersSelected) {
      this.hiddenPlayers = this.players.map(p => p.playerId);
    } else {
      this.hiddenPlayers = [];
    }
  }

  get teamFilter(): number {
    return this._teamFilter;
  }

  set teamFilter(value: number) {
    if (value === this._teamFilter) {
      return;
    }

    this._teamFilter = value;

    this._loadData();
  }

  get timescaleFilter(): number {
    return this._timescaleFilter;
  }

  set timescaleFilter(value: number) {
    const timescale = value as Timescale;
    const today = new Date();

    // TODO [TH] - Move this stuff and make generic today methods in the date service
    switch (timescale) {
      case Timescale.Last7Days:
        this.xMin = this.firstOfWeek;
        this.xMaxAsDate = today;
        break;
      case Timescale.Last30Days:
        const firstOfMonth = new Date();
        firstOfMonth.setDate(1);
        this.xMinAsDate = firstOfMonth;
        this.xMaxAsDate = today;
        break;
      default:
        this.xMinAsDate = this._dateService.firstOfAllTime;
        this.xMaxAsDate = today;
        break;
    }


    if (value === this._timescaleFilter) {
      return;
    }

    this._timescaleFilter = value;

    this._loadData();
  }

  get noOfPlayersFilter(): number {
    return this._noOfPlayersFilter;
  }

  set noOfPlayersFilter(value: number) {
    if (value === this._noOfPlayersFilter) {
      return;
    }

    this._noOfPlayersFilter = value;

    this._loadData();
  }

  get dateRangeMin(): number {
    let min = 0;
    switch (this._timescaleFilter) { // TODO [TH] - make this clean
      case Timescale.AllTime:
        min = this.firstOfAllTime;
        break;
      case Timescale.Last30Days:
        min = this.firstOfMonth;
        break;
      case Timescale.Last7Days:
        min = this.firstOfWeek;
        break;
      default:
        break;
    }
    return min;
  }

  get dateRangeOptions(): { value: any, text: string }[] {
    let options: { value: any, text: string }[] = [];
    switch (this._timescaleFilter) { // TODO [TH] - make this clean
      case Timescale.AllTime:
        options = this.allTimeDateRangeOptions;
        break;
      case Timescale.Last30Days:
        options = this.thisMonthDateRangeOptions;
        break;
      case Timescale.Last7Days:
        options = this.thisWeekDateRangeOptions;
        break;
      default:
        break;
    }
    return options;
  }

  private get allTimeDateRangeOptions(): { value: any, text: string }[] {
    const thisMonth = this._dateService.getRelativeMonth(this._dateService.today);
    const firstMonth = this._dateService.getRelativeMonth(this._dateService.firstOfAllTime);
    const totalNumberOfMonths = (thisMonth - firstMonth) + 1;
    const monthsToSkipAtATime = Math.ceil(totalNumberOfMonths / 9);
    const options: { value: any, text: string }[] = [];
    let monthLabel = this._dateService.getMMMStringFromRelativeMonth(firstMonth);
    options.push({value: this.dateRangeMin, text: monthLabel });
    for (let month = firstMonth + 1; month <= thisMonth; month = month + monthsToSkipAtATime) {
      const firstOfMonth = this._dateService.getDateFromRelativeMonth(month);
      const firstOfMonthAsRelativeDay = this._dateService.getRelativeDay(firstOfMonth);
      monthLabel = this._dateService.getMMMStringFromRelativeMonth(month);
      options.push({value: firstOfMonthAsRelativeDay, text: monthLabel});
    }
    return options;
  }

  private get thisMonthDateRangeOptions(): { value: any, text: string }[] {
    const today = this.today;
    const firstOfMonth = this.firstOfMonth;
    const daysThisMonth = (today - firstOfMonth) + 1;
    const daysToSkipAtATime = Math.ceil(daysThisMonth / 9);
    const options: { value: any, text: string }[] = []
    for (let day = firstOfMonth; day < today; day = day + daysToSkipAtATime) {
      const date = this._dateService.getDateFromRelativeDay(day);
      const label = `${date.getDate()}${this.getOrdinal(date.getDate())}`;
      options.push({value: day, text: label})
    }
    options.push({value: today, text: 'Today'});
    return options;
  }

  private getOrdinal(value: number): string {
    return["st","nd","rd"][((value+90)%100-10)%10-1]||"th";
  }

  private get thisWeekDateRangeOptions(): { value: any, text: string }[] {
    const today = this.today;
    const firstOfWeek = this.firstOfWeek;
    const options: { value: any, text: string }[] = []
    for (let day = firstOfWeek; day < today; day++) {
      const date = this._dateService.getDateFromRelativeDay(day);
      const label = this.getDayOfWeekString(date.getDay());
      options.push({value: day, text: label})
    }
    options.push({value: today, text: 'Today'});
    return options;
  }

  private getDayOfWeekString(value: number): string {
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][value-1]; // TODO [TH] Put this somewhere else
  }

  get percentageRangeOptions(): { value: any, text: string }[] {
    return [0, 20, 40, 60, 80, 100].map(o => { return { value: o, text: `${o}%` } })
  }

  private get playerCount(): number {
    if (isNullOrUndefined(this.playerDetails)) {
      return 0
    }
    return this.playerDetails.length;
  }

  private get firstOfAllTime(): number {
    const date = this._dateService.firstOfAllTime;
    return this._dateService.getRelativeDay(date);
  }

  private get firstOfWeek(): number {
    const date = this._dateService.firstOfWeek;
    return this._dateService.getRelativeDay(date);
  }

  private get firstOfMonth(): number {
    const date = this._dateService.firstOfMonth;
    return this._dateService.getRelativeDay(date);
  }

  private get oneWeekAgoToday(): number {
    const date = this._dateService.oneWeekAgoToday;
    return this._dateService.getRelativeDay(date);
  }

  private get today(): number {
    const date = this._dateService.today;
    return this._dateService.getRelativeDay(date);
  }

  private _loadData(): void {
    this._graphClient.get(this.teamFilter, this.timescaleFilter, this.noOfPlayersFilter, 0, Role.None)
      .pipe(take(1))
      .subscribe(
        data => {
          this.players = data;
        },
        error => {
          this.errorOccurred = true;
        }
      )
  }

}
