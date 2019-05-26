import { Component, OnInit } from '@angular/core';
import { PlayerClient, PlayerListingDto } from '../../../services/web-api.service.generated';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-player-listing',
  templateUrl: './player-listing.component.html',
  styleUrls: ['./player-listing.component.scss']
})
export class PlayerListingComponent implements OnInit {

  constructor(private _playerClient: PlayerClient) { }

  public isLoading = true;
  public errorOccurred = false;
  public players: PlayerListingDto[] = [];

  ngOnInit() {
    this._playerClient.getPlayers()
      .pipe(take(1))
      .subscribe(
        player => { this.players = player; this.isLoading = false },
        error => { this.errorOccurred = true; }
      )
  }

}
