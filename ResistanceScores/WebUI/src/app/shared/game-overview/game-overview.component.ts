import { Component, OnInit } from '@angular/core';
import { LeaderboardClient, GameOverviewDto } from '../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game-overview',
  templateUrl: './game-overview.component.html',
  styleUrls: ['./game-overview.component.scss']
})
export class GameOverviewComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public gameOverview: GameOverviewDto[] = [];
  public isLoading = true;
  public errorOccurred = false;

  ngOnInit() {
    this._loadData();
  }

  getLossCount(game: GameOverviewDto): number {
    return game.totalGames - game.resistanceWins;
  }

  getWinPercentage(game: GameOverviewDto): number {
    return game.totalGames > 0
      ? 100 * game.resistanceWins / game.totalGames
      : 0;
  }

  reloadData(): void {
    this.isLoading = true;
    this.errorOccurred = false;
    this._loadData();
  }

  private _loadData(): void {
    this._leaderboardClient
      .getGameLeaderboard()
      .pipe(take(1))
      .subscribe(
        overview => { this.gameOverview = overview; },
        error => { this.errorOccurred = true; }
      )
  }
}
