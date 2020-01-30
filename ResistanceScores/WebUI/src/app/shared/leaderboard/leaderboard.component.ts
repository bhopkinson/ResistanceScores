import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team, Timescale, GameSummaryDto, Role } from '../../services/web-api.service.generated';
import { take, switchMap, map, startWith, tap, catchError } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

  constructor(private _fb: FormBuilder, private _leaderboardClient: LeaderboardClient) { }

  public leaderboard: LeaderboardDto[] = [];
  public isLoading = true;
  public errorOccurred = false;
  public Team = Team;
  public Timescale = Timescale;
  public Role = Role;

  private _defaultCriteria: Criteria = {
    timescale: Timescale.AllTime,
    team: Team.None,
    noOfPlayers: 4,
    role: Role.None,
    asOfWhen: 0
  };

  public filters = this._fb.group(this._defaultCriteria);

  ngOnInit() {
    this.filters
      .valueChanges
      .pipe(startWith(this._defaultCriteria))
      .subscribe(o => this._loadData(o));
  }

  getLossCount(player: LeaderboardDto): number {
    return player.totalGames - player.wins;
  }

  getWinPercentage(player: LeaderboardDto): number {
    return player.totalGames > 0
      ? 100 * player.wins / player.totalGames
      : 0;
  }

  reloadData(): void {
    this.isLoading = true;
    this.errorOccurred = false;
    this._loadData(this.filters.value);
  }

  private sortByPercentageFn = (a: LeaderboardDto, b: LeaderboardDto) => {
    const result = this.getWinPercentage(b) - this.getWinPercentage(a);
    return result !== 0
      ? result
      : b.totalGames - a.totalGames; // TODO [TH] rename the sort function and centralise it and refactor it
  }

  private _loadData(criteria: Criteria): void {
    this._leaderboardClient
      .getLeaderboard(criteria.team, criteria.timescale, criteria.noOfPlayers, criteria.asOfWhen, criteria.role)
      .pipe(take(1))
      .subscribe(
        leaderboard => {
          this.leaderboard = leaderboard.sort(this.sortByPercentageFn);
          this.isLoading = false;
        },
        error => { this.errorOccurred = true; }
      );
  }
}

interface Criteria {
  team: Team;
  timescale: Timescale;
  noOfPlayers: number;
  asOfWhen: number;
  role: Role;
};