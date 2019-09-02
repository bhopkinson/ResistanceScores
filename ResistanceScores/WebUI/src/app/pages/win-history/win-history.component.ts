import { Component, OnInit } from '@angular/core';
import { LeaderboardClient, GameSummaryDto } from 'src/app/services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-win-history',
  templateUrl: './win-history.component.html',
  styleUrls: ['./win-history.component.scss']
})
export class WinHistoryComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient) { }

  public summaryPlayers: string[] = [];
  public summaryGames: GameSummaryDto[] = [];
  public isLoading = true;
  public errorOccurred = false;

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

  private _loadData(): void {
    this._leaderboardClient
      .getWinHistory()
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
