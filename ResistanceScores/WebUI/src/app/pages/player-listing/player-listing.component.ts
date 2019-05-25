import { Component, OnInit } from '@angular/core';
import { PlayerClient, PlayerListingDto } from '../../services/web-api.service.generated';

@Component({
  selector: 'app-player-listing',
  templateUrl: './player-listing.component.html',
  styleUrls: ['./player-listing.component.scss']
})
export class PlayerListingComponent implements OnInit {

  public players: PlayerListingDto[];

  constructor(private _playerClient: PlayerClient) { }

  ngOnInit() {
    this._playerClient.getAll().subscribe(players => { this.players = players; })
  }

}
