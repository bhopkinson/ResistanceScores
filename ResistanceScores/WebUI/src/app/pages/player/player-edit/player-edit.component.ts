import { Component, OnInit, Input } from '@angular/core';
import { PlayerClient, PlayerUpdateDto } from '../../../services/web-api.service.generated';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private _playerClient: PlayerClient, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  form: FormGroup;
  isLoading = false;
  playerId = 0;

  @Input()
  public isNew = false;

  ngOnInit() {
    this.isLoading = !this.isNew; // If there is no user to load, then the page has nothing to wait for

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      surname: ['', [Validators.required, Validators.maxLength(50)]],
      initials: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
    });

    if (!this.isNew) {
      this.playerId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

      this._playerClient.getPlayer(this.playerId).pipe(take(1)).subscribe(
        player => {
          this.form.setValue({
            firstName: player.firstName,
            surname: player.surname,
            initials: player.initials,
          });
          this.isLoading = false;
        },
        error => { this._router.navigate(['/players']); }
      );
    }
  }

  submit() {
    if (this.form.valid) {
      const player = new PlayerUpdateDto({
        id: this.playerId,
        firstName: this.form.get('firstName').value,
        surname: this.form.get('surname').value,
        initials: this.form.get('initials').value,
      })

      if (this.isNew) {
        this._playerClient.createPlayer(player)
          .pipe(take(1))
          .subscribe(id => this._router.navigate([`players/edit/${id}`]));
      } else {
        this._playerClient.updatePlayer(player)
          .pipe(take(1))
          .subscribe(_ => this._router.navigate([`players`]));
      }
    }
    
  }

  delete() {
    const confirmed = confirm('Are you sure you wish to delete this person?');

    if (confirmed) {
      this._playerClient.deletePlayer(this.playerId)
        .pipe(take(1))
        .subscribe(_ => this._router.navigate(['players']));
    }
  }

}

