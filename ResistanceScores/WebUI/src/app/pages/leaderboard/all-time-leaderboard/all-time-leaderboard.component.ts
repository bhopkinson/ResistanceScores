import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team, Timescale } from '../../../services/web-api.service.generated';
import { take, timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-all-time-leaderboard',
  templateUrl: './all-time-leaderboard.component.html',
  styleUrls: ['./all-time-leaderboard.component.scss']
})
export class AllTimeLeaderboardComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public leaderboard: LeaderboardDto[] = [];
  public isLoading = true;
  public errorOccurred = false;
  public teamFilter = Team.None;
  public timescaleFilter = Timescale.AllTime;
  public noOfPlayersFilter = 4;
  public Team = Team;
  public Timescale = Timescale;

  ngOnInit() {
    this._leaderboardClient
      .getLeaderboard(Team.None, Timescale.AllTime, 4)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard.sort(this.sortByPercentageFn); this.isLoading = false; },
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

  updateTeamFilter(team: Team): void {
    if (team === this.teamFilter) {
      return;
    }

    this.reload(team, this.timescaleFilter, this.noOfPlayersFilter);
  }

  updateTimescaleFilter(timescale: Timescale): void {
    if (timescale === this.timescaleFilter) {
      return;
    }

    this.reload(this.teamFilter, timescale, this.noOfPlayersFilter);
  }

  updateNoOfPlayersFilter(noOfPlayers: number): void {
    if (noOfPlayers === this.noOfPlayersFilter) {
      return;
    }

    this.reload(this.teamFilter, this.timescaleFilter, noOfPlayers);
  }

  private sortByPercentageFn = (a: LeaderboardDto, b: LeaderboardDto) => { return this.percentage(b) - this.percentage(a); }

  private reload(team: Team, timescale: Timescale, noOfPlayers: number): void {

    this._leaderboardClient
      .getLeaderboard(team, timescale, noOfPlayers)
      .pipe(take(1))
      .subscribe(
      leaderboard => {
        this.leaderboard = leaderboard.sort(this.sortByPercentageFn);
        this.teamFilter = team;
        this.timescaleFilter = timescale;
        this.noOfPlayersFilter = noOfPlayers;
      },
        error => { this.errorOccurred = true; }
      )
  }

}
