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
  public errorOccurred = false

  ngOnInit() {
    this._leaderboardClient
      .getDaySummary()
      .pipe(take(1))
      .subscribe(
        summary => {
          this.summaryPlayers = summary.players;
          this.summaryGames = summary.games;
          this.isLoading = false;},
        error => { this.errorOccurred = true; })
  }

  summaryWinOrLoss(player: string, game: GameSummaryDto): boolean | null {
    let gamePlayer = game.players.find(p => p.player === player);

    if (gamePlayer === undefined) {
      return null;
    };

    return gamePlayer.win;
  }

}
