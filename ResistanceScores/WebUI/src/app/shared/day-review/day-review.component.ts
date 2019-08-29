import { Component, OnInit } from '@angular/core';
import { GameSummaryDto, LeaderboardClient } from '../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-day-review',
  templateUrl: './day-review.component.html',
  styleUrls: ['./day-review.component.scss']
})
export class DayReviewComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public summaryPlayers: string[] = [];
  public summaryGames: GameSummaryDto[] = [];
  public isLoading = true;
  public errorOccurred = false;

  public daysAgo = 0;

  ngOnInit() {
    this._loadData();
  }

  getWinOrLoss(player: string, game: GameSummaryDto): boolean | null {
    let gamePlayer = game.players.find(p => p.player === player);

    if (gamePlayer === undefined) {
      return null;
    };

    return gamePlayer.win;
  }

  previousDay() {
    this.daysAgo++;
    this._loadData();
  }

  nextDay() {
    this.daysAgo--;
    this._loadData();
  }

  reloadData(): void {
    this._loadData();
  }

  get daysAgoString(): string {
    switch (this.daysAgo) {
      case 0:
        return 'Today';
      case 1:
        return 'Yesterday';
      default:
        return `${this.daysAgo} days ago`
    }
  }

  private _loadData(): void {
    this.isLoading = true;
    this.errorOccurred = false;
    this._leaderboardClient
      .getDaySummary(this.daysAgo)
      .pipe(take(1))
      .subscribe(
        summary => {
          this.summaryPlayers = summary.players;
          this.summaryGames = summary.games;
          this.isLoading = false;
        },
        error => { this.errorOccurred = true; })
  }
}
