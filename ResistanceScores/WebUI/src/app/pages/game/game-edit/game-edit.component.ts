import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameClient, GameUpdateDto, PlayerListingDto, PlayerClient, GamePlayerUpdateDto, Role } from '../../../services/web-api.service.generated';
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

  date = new Date(new Date().setHours(0, 0, 0));
  players: PlayerListingDto[] = [];
  selectedPlayerIds: number[] = [];
  spyIds: number[] = [];
  chiefIds: number[] = [];
  hunterIds: number[] = [];
  defectorIds: number[] = [];
  dummyId = 0;
  resistanceWin: boolean = null;
  hasExtraDetails = false;

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
          this.date = g.date;
          this.selectedPlayerIds = g.players
            .map(p => p.id);
          this.spyIds = g.players
            .filter(p => !p.wasResistance)
            .map(p => p.id);
          this.chiefIds = g.players
            .filter(p => p.role === Role.Chief)
            .map(p => p.id);
          this.hunterIds = g.players
            .filter(p => p.role === Role.Hunter)
            .map(p => p.id);
          this.defectorIds = g.players
            .filter(p => p.role === Role.Defector)
            .map(p => p.id);
          g.players
            .filter(p => p.role === Role.Dummy)
            .forEach(p => this.dummyId = p.id);
          if (this.hunterIds.length > 0) {
            this.hasExtraDetails = true;
          }
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

  role(playerId: number): Role {
    if (!this.hasExtraDetails) {
      return Role.None;
    } else if (this.chiefIds.includes(playerId)) {
      return Role.Chief;
    } else if (this.hunterIds.includes(playerId)) {
      return Role.Hunter;
    } else if (this.dummyId === playerId) {
      return Role.Dummy;
    } else if (this.defectorIds.includes(playerId)) {
      return Role.Defector;
    } else {
      return Role.Regular;
    }
  }

  get isValid(): boolean {
    const playerCount = this.selectedPlayerIds.length;
    const spyCount = this.spyIds.length;

    if (playerCount < 5 || playerCount > 11) {
      alert('Games must have between 5 and 11 players');
      return false;
    }

    //const spyCounts: { [key: number]: number } = {
    //  5: 2,
    //  6: 2,
    //  7: 3,
    //  8: 3,
    //  9: 3,
    //  10: 4,
    //  11: 4,
    //}

    //if (spyCounts[playerCount] !== spyCount) {
    //  alert(`Games with ${playerCount} players must have ${spyCounts[playerCount]} spies`);
    //  return false;
    //}

    return true;
  }

  submit() {
    if (this.isValid) {
      const gamePlayers = this.selectedPlayers.map(p => new GamePlayerUpdateDto({
        id: p.id,
        wasResistance: !this.spyIds.includes(p.id),
        role: this.role(p.id)
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
