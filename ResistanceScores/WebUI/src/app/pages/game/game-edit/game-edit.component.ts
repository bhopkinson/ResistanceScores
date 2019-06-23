import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameClient, GameUpdateDto, PlayerListingDto, PlayerClient, GamePlayerUpdateDto } from '../../../services/web-api.service.generated';
import { take, retry } from 'rxjs/operators';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private _gameClient: GameClient,
    private _playerClient: PlayerClient,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  @Input()
  public isNew = false;

  isLoading = false;
  gameId = 0;

  date = new Date();
  players: PlayerListingDto[] = [];
  selectedPlayerIds: number[] = [];
  spyIds: number[] = [];
  resistanceWin: boolean = null;

  get selectedPlayers(): PlayerListingDto[] {
    return this.players
      .filter(p => this.selectedPlayerIds.includes(p.id));
  }

  stringToDate(date: string): Date {
    return new Date(date);
  }

  ngOnInit() {
    this.isLoading = !this.isNew; // TODO [TH] remove. If there is no game to load, then the page has nothing to wait for

    this._playerClient.getPlayers()
      .pipe(take(1))
      .subscribe(players => this.players = players);

    if (!this.isNew) {
      this.gameId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

      this._gameClient.getGame(this.gameId)
        .pipe(take(1))
        .subscribe(g => {
          console.log(this.date);
          console.log(g.date);
          this.date = g.date;
          this.selectedPlayerIds = g.players
            .map(p => p.id);
          this.spyIds = g.players
            .filter(p => !p.wasResistance)
            .map(p => p.id);
          this.resistanceWin = g.resistanceWin;
          this.isLoading = false;
        },
          error => { this._router.navigate(['/games']); }
        );
    }
  }

  selectWinner(resWin: boolean): void {
    this.resistanceWin = resWin;
  }

  get isValid(): boolean {
    const playerCount = this.selectedPlayerIds.length;
    const spyCount = this.spyIds.length;

    if (playerCount < 5 || playerCount > 11) {
      alert('Games must have between 5 and 11 players');
      return false;
    }

    const spyCounts: { [key: number]: number } = {
      5: 2,
      6: 2,
      7: 3,
      8: 3,
      9: 3,
      10: 4,
      11: 4,
    }

    if (spyCounts[playerCount] !== spyCount) {
      alert(`Games with ${playerCount} players must have ${spyCounts[playerCount]} spies`);
      return false;
    }

    return true;
  }

  submit() {
    console.log(this.date)
    if (this.isValid) {
      const gamePlayers = this.selectedPlayers.map(p => new GamePlayerUpdateDto({
        id: p.id,
        wasResistance: !this.spyIds.includes(p.id)
      }))

      const game = new GameUpdateDto({
        id: this.gameId,
        date: this.date,
        resistanceWin: this.resistanceWin,
        players: gamePlayers
      })

      if (this.isNew) {
        this._gameClient.createGame(game)
          .pipe(take(1))
          .subscribe(id => alert(`Created game ${id}`));
      } else {
        this._gameClient.updateGame(game)
          .pipe(take(1))
          .subscribe(_ => this._router.navigate([`/games`]));
      }
    }
  }

  delete() {
    const confirmed = confirm('Are you sure you wish to delete this game?');

    if (confirmed) {
      this._gameClient.deleteGame(this.gameId)
        .pipe(take(1))
        .subscribe(_ => this._router.navigate(['/games']));
    }
  }
}
