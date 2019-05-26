import { Component, OnInit } from '@angular/core';
import { PlayerClient, PlayerUpdateDto } from '../../../services/web-api.service.generated';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _playerClient: PlayerClient) { }

  public player: PlayerUpdateDto;
  public isLoading = true;

  ngOnInit() {
    const id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

    this._playerClient.getPlayer(id).pipe(take(1)).subscribe(
      player => { this.player = player; this.isLoading = false; },
      error => { this._router.navigate(['/players']); }
    );

  }

}
