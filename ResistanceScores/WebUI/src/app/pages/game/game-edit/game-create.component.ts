import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-create',
  template: '<app-game-edit [isNew]="true"></app-game-edit>',
})
export class GameCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
