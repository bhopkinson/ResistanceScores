import { Component, OnInit } from '@angular/core';
import { PairingClient, PairingSummaryDto, PlayerClient, PlayerListingDto } from 'src/app/services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pairings',
  templateUrl: './pairings.component.html',
  styleUrls: ['./pairings.component.scss']
})
export class PairingsComponent implements OnInit {

  constructor(private _pairingClient: PairingClient, private _playerClient: PlayerClient) { }

  public pairings: PairingSummaryDto[] = [];
  public players: PlayerListingDto[] = [];

  public isSummaryLoading = true;
  public arePlayersLoading = true;
  public get isLoading() { return this.isSummaryLoading || this.arePlayersLoading; }
  public errorOccurred = false;

  private initiallyVisiblePairingCount = 10;
  private showAll = false;
  

  private UNKNOWN_PLAYER_STRING = '??';

  ngOnInit() {
    this._loadPairingSummary();
    this._loadPlayers();
  }

  getLossCount(pairing: PairingSummaryDto): number {
    return pairing.totalGames - pairing.wins;
  }

  getWinPercentage(pairing: PairingSummaryDto): number {
    return pairing.totalGames > 0
      ? 100 * pairing.wins / pairing.totalGames
      : 0;
  }

  getMultipleInitials(playerIds: number[]): string {
    const initials = playerIds.map(id => this.getInitials(id));
    return initials.join(', ');
  }

  getInitials(playerId: number): string { // TODO - TH - Move this to a new player service
    const players = this.players.filter(p => p.id === playerId);
    if (players.length === 1) {
      const player = players[0];
      return player.initials
    }
    return this.UNKNOWN_PLAYER_STRING;
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  get toggleShowAllLabel(): string {
    return this.showAll
      ? 'Show fewer'
      : 'Show more';
  }

  get visiblePairings(): PairingSummaryDto[] {
    return this.showAll
      ? this.pairings
      : this.pairings.slice(0, this.initiallyVisiblePairingCount);
  }

  private sortByPercentageFn = (a: PairingSummaryDto, b: PairingSummaryDto) => { return this.getWinPercentage(b) - this.getWinPercentage(a); }

  private _loadPairingSummary(): void {
    this._pairingClient
      .getSummary()
      .pipe(take(1))
      .subscribe(
        summary => {
          this.pairings = summary.sort(this.sortByPercentageFn);
          this.isSummaryLoading = false;
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
