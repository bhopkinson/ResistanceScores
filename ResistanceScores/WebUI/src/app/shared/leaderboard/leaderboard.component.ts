import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team, Timescale, GameOverviewDto, GameSummaryDto, GameListDto } from '../../services/web-api.service.generated';
import { take, timeInterval } from 'rxjs/operators';
import { Constants } from '../../constants';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public leaderboard: LeaderboardDto[] = [];
  public isLoading = true;
  public errorOccurred = false;
  private _teamFilter = Team.None;
  private _timescaleFilter = Timescale.AllTime;
  private _noOfPlayersFilter = 4;
  private _asOfWhenFilter = 0;
  public Team = Team;
  public Timescale = Timescale;

  ngOnInit() {
    this._leaderboardClient
      .getLeaderboard(Team.None, Timescale.AllTime, 4, 0)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard.sort(this.sortByPercentageFn); this.isLoading = false; },
        error => { this.errorOccurred = true; }
      )
  }

  getLossCount(player: LeaderboardDto): number {
    return player.totalGames - player.wins;
  }

  getWinPercentage(player: LeaderboardDto): number {
    return player.totalGames > 0
      ? 100 * player.wins / player.totalGames
      : 0;
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

  get asOfWhenFilter(): number {
    return this._asOfWhenFilter;
  }

  set asOfWhenFilter(value: number) {
    if (value === this._asOfWhenFilter) {
      return;
    }

    this._asOfWhenFilter = value;

    this._loadData();
  }

  reloadData(): void {
    this.isLoading = true;
    this.errorOccurred = false;
    this._loadData();
  }

  private sortByPercentageFn = (a: LeaderboardDto, b: LeaderboardDto) => { return this.getWinPercentage(b) - this.getWinPercentage(a); }

  private _loadData(): void {
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
