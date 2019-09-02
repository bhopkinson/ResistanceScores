import { Component, OnInit } from '@angular/core';
import { LeaderboardClient, GameClient, GameSummaryDto, GameListingDto } from 'src/app/services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-win-history',
  templateUrl: './win-history.component.html',
  styleUrls: ['./win-history.component.scss']
})
export class WinHistoryComponent implements OnInit {

  constructor(private _leaderboardClient: LeaderboardClient, private _gameClient: GameClient) { }

  public summaryPlayers: string[] = [];
  public summaryGames: GameSummaryDto[] = [];
  public games: GameListingDto[] = [];
  public isWinHistoryLoading = true;
  public areGamesLoading = true;
  public errorOccurred = false;
  private _firstGamesOfMonths: number[] = [];

  ngOnInit() {
    this._loadWinHistory();
    this._loadGames();
  }

  getWinOrLoss(player: string, game: GameSummaryDto): boolean | null {
    let gamePlayer = game.players.find(p => p.player === player);

    if (gamePlayer === undefined) {
      return null;
    };

    return gamePlayer.win;
  }

  getIsFirstOfMonth(gameId: number): boolean {
    return this._firstGamesOfMonths.includes(gameId);
  }

  get isLoading(): boolean {
    return this.isWinHistoryLoading || this.areGamesLoading;
  }

  private _calculateFirstOfMonths(): void {
    // TODO
  }

  private _loadWinHistory(): void {
    this._leaderboardClient
      .getWinHistory()
      .pipe(take(1))
      .subscribe(
        summary => {
          this.summaryPlayers = summary.players;
          this.summaryGames = summary.games;
          this.isWinHistoryLoading = false;
        },
        error => { this.errorOccurred = true; })
  }

  private _loadGames(): void {
    this._gameClient
      .getGames()
      .pipe(take(1))
      .subscribe(
        games => {
          this.games = games;
          this.areGamesLoading = false;
        },
        error => { this.errorOccurred = true; })
  }

}
