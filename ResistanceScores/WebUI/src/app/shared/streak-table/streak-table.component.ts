import { Component, OnInit } from '@angular/core';
import { LeaderboardClient, PlayerClient, StreakDto, PlayerListingDto } from '../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-streak-table',
  templateUrl: './streak-table.component.html',
  styleUrls: ['./streak-table.component.scss']
})
export class StreakTableComponent implements OnInit {

  private UNKNOWN_PLAYER_INITIALS = 'N/A';

  constructor(private _leaderboardClient: LeaderboardClient, private _playerClient: PlayerClient) { }

  playerStreaks: StreakDto[];
  players: PlayerListingDto[];
  areStreaksLoading = true;
  arePlayersLoading = true;
  errorOccurred = false;

  ngOnInit() {
    this._loadPlayers();
    this._loadStreaks();
  }

  get isLoading(): boolean {
    return this.areStreaksLoading && this.arePlayersLoading;
  }

  getPlayerInitials(playerId: number): string {
    const players = (this.players) && this.players.filter(p => p.id === playerId);
    const player = (players && players.length) && players[0];

    const initials = (player !== null && player.initials !== undefined)
      ? player.initials
      : this.UNKNOWN_PLAYER_INITIALS;

    return initials;
  }

  reloadData(): void {
    this.areStreaksLoading = true;
    this._loadStreaks();
  }

  private _loadStreaks(): void {
    this._leaderboardClient
      .getStreaks()
      .pipe(take(1))
      .subscribe(
        streaks => {
          this.playerStreaks = streaks;
          this.areStreaksLoading = false;
        },
        error => { this.errorOccurred = true; }
      );
  }

  private _loadPlayers(): void {
    this._playerClient
      .getPlayers()
      .pipe(take(1))
      .subscribe(
        players => {
          this.players = players;
          this.arePlayersLoading = false;
        },
        error => { this.errorOccurred = true; }
      );
  }
}
