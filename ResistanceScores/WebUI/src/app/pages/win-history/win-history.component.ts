import { Component, OnInit } from '@angular/core';
import { LeaderboardClient, GameClient, GameSummaryDto, GameListingDto } from 'src/app/services/web-api.service.generated';
import { take } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

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

  private gameMonths: { identifier: string, firstGameId: number, gameCount: number, label: string }[] = [];

  log = console.log

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
    return this.gameMonths.map(gm => gm.firstGameId).includes(gameId);
  }

  getMonthLabel(gameId: number): string {
    const gameMonthSingleton = this.gameMonths.filter(gm => gm.firstGameId === gameId);
    return gameMonthSingleton.length > 0
      ? gameMonthSingleton[0].label
      : '';
  }

  get isLoading(): boolean {
    return this.isWinHistoryLoading || this.areGamesLoading;
  }

  private _populateGameMonths(): void {
    let id: number;
    let identifier: string;

    this.games.forEach((g) => {
      id = g.id;
      identifier = this._getIdentifierFromDate(g.date);

      if (this._gameMonthAlreadyExists(identifier)) {
        const gameMonth = this._getGameMonth(identifier);
        gameMonth.gameCount++;
      } else {
        const label = g.date.toLocaleString('default', { month: 'long' });
        this.gameMonths.push({ identifier, firstGameId: id, gameCount: 1, label });
      }
    })
    console.log(this.gameMonths);
  }

  private _gameMonthAlreadyExists(identifier: string): boolean {
    return this.gameMonths.filter(gm => gm.identifier === identifier).length > 0;
  }

  private _getIdentifierFromDate(date: Date): string {
    return `${ date.getMonth() }/${ date.getFullYear() }`;
  }

  private _getGameMonth(identifier: string): { identifier: string, firstGameId: number, gameCount: number, label: string } | null {
    const gameMonthSingleton = this.gameMonths.filter(gm => gm.identifier === identifier);
    return gameMonthSingleton.length > 0
      ? gameMonthSingleton[0]
      : null;
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
          this.games = games.sort((a, b) => a.id - b.id);
          this._populateGameMonths();
          this.areGamesLoading = false;
        },
        error => { this.errorOccurred = true; })
  }

}
