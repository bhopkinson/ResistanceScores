import { Component, OnInit } from '@angular/core';
import { LeaderboardDto, LeaderboardClient, Team } from '../../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

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
  public Team = Team;

  ngOnInit() {
    this._leaderboardClient
      .getLeaderboard(Team.None)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard; this.isLoading = false; },
        error => { this.errorOccurred = true; }
      )
  }

  losses(player: LeaderboardDto): number {
    return player.totalGames - player.wins;
  }

  percentage(player: LeaderboardDto): number {
    return 100 * player.wins / player.totalGames
  }

  reload(team: Team): void {
    if (team === this.teamFilter) {
      return
    }

    this._leaderboardClient
      .getLeaderboard(team)
      .pipe(take(1))
      .subscribe(
        leaderboard => { this.leaderboard = leaderboard; this.teamFilter = team; },
        error => { this.errorOccurred = true; }
      )
  }

}
