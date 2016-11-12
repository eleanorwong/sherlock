import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  newGame: Game = {
      config: {
          dayLength: 5,
          nightLength: 5
      }
  };

  games: FirebaseListObservable<any[]>;

  submitted = false;

  onSubmit() {
      this.submitted = true;
  }

  createGame() {
      console.log("create game");
      this.games.push(this.newGame);
  }

  constructor(af: AngularFire) {
    this.games = af.database.list('/games');
  }

  ngOnInit() {
  }

}
