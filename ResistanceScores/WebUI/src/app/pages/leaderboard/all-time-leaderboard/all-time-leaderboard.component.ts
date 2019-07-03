import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team, Timescale, GameOverviewDto, GameSummaryDto, GameListDto } from '../../../services/web-api.service.generated';
import { take, timeInterval } from 'rxjs/operators';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-all-time-leaderboard',
  templateUrl: './all-time-leaderboard.component.html',
  styleUrls: ['./all-time-leaderboard.component.scss']
})
export class AllTimeLeaderboardComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public leaderboard: LeaderboardDto[] = [];
  public gameOverview: GameOverviewDto[] = [];
  public isLoading = true;
  public errorOccurred = false;
  private _teamFilter = Team.None;
  private _timescaleFilter = Timescale.AllTime;
  private _noOfPlayersFilter = 4;
  private _asOfWhenFilter = 0;
  public Team = Team;
  public Timescale = Timescale;

  public clickCount = 0;

  ngOnInit() {
    this._leaderboardClient
      .getLeaderboard(Team.None, Timescale.AllTime, 4, 0)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard.sort(this.sortByPercentageFn); this.isLoading = false; },
        error => { this.errorOccurred = true; }
    )

    this._leaderboardClient
      .getGameLeaderboard()
      .pipe(take(1))
      .subscribe(
        overview => { this.gameOverview = overview;},
        error => { this.errorOccurred = true; }
    )
  }

  losses(player: LeaderboardDto): number {
    return player.totalGames - player.wins;
  }

  percentage(player: LeaderboardDto): number {
    return player.totalGames > 0
      ? 100 * player.wins / player.totalGames
      : 0;
  }

  gamesLosses(game: GameOverviewDto): number {
    return game.totalGames - game.resistanceWins;
  }

  gamesPercentage(game: GameOverviewDto): number {
    return game.totalGames > 0
      ? 100 * game.resistanceWins / game.totalGames
      : 0;
  }

  gameChanceOfWinning(game: GameOverviewDto, teamSize: number) {
    const chanceOfAResistanceWin = this.gamesPercentage(game);
    const chanceOfBeingResistance = (teamSize - Constants.noOfSpies(teamSize)) / teamSize;
    const chanceOfWinningAsResistance = chanceOfAResistanceWin * chanceOfBeingResistance;

    const chanceOfASpyWin = game.totalGames > 0 ? 100 - this.gamesPercentage(game) : 0;
    const chanceOfBeingSpy = Constants.noOfSpies(teamSize) / teamSize;
    const chanceOfWinningAsSpy = chanceOfASpyWin * chanceOfBeingSpy;

    return chanceOfWinningAsResistance + chanceOfWinningAsSpy;
  }

  updateTeamFilter(team: Team): void {
    if (team === this.teamFilter) {
      return;
    }

    this.reload();
  }

  get teamFilter(): number {
    return this._teamFilter;
  }

  set teamFilter(value: number) {
    if (value === this._teamFilter) {
      return;
    }

    this._teamFilter = value;

    this.reload();
  }

  get timescaleFilter(): number {
    return this._timescaleFilter;
  }

  set timescaleFilter(value: number) {
    if (value === this._timescaleFilter) {
      return;
    }

    this._timescaleFilter = value;

    this.reload();
  }

  get noOfPlayersFilter(): number {
    return this._noOfPlayersFilter;
  }

  set noOfPlayersFilter(value: number) {
    if (value === this._noOfPlayersFilter) {
      return;
    }

    this._noOfPlayersFilter = value;

    this.reload();
  }

  get asOfWhenFilter(): number {
    return this._asOfWhenFilter;
  }

  set asOfWhenFilter(value: number) {
    if (value === this._asOfWhenFilter) {
      return;
    }

    this._asOfWhenFilter = value;

    this.reload();
  }

  clickCounter(): void {
    this.clickCount++;
  }

  refresh() {
    window.location.reload();
  }

  private sortByPercentageFn = (a: LeaderboardDto, b: LeaderboardDto) => { return this.percentage(b) - this.percentage(a); }

  private reload(): void {
    this._leaderboardClient
      .getLeaderboard(this.teamFilter, this.timescaleFilter, this.noOfPlayersFilter, this.asOfWhenFilter)
      .pipe(take(1))
      .subscribe(
      leaderboard => {
        this.leaderboard = leaderboard.sort(this.sortByPercentageFn);
      },
        error => { this.errorOccurred = true; }
      )
  }

}
