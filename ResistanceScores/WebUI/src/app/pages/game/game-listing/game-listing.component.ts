import { Component, OnInit } from '@angular/core';
import { GameClient, GameListingDto } from '../../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game-listing',
  templateUrl: './game-listing.component.html',
  styleUrls: ['./game-listing.component.scss']
})
export class GameListingComponent implements OnInit {

  constructor(private _gameClient: GameClient) { }

  games: GameListingDto[] = [];
  isLoading = true;
  errorOccurred = false;

  ngOnInit() {
    this._gameClient.getGames()
      .pipe(take(1))
      .subscribe(
      games => { this.games = games; this.isLoading = false; },
      error => { this.errorOccurred = true; })
  }

}
