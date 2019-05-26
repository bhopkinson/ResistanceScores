import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-create',
  template: '<app-player-edit [isNew]="true"></app-player-edit>'
})
export class PlayerCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
