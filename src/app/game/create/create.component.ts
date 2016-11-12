import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

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
      },
      players: []
  };

  af: AngularFire;
  uid: string;
  games: FirebaseListObservable<any[]>;
  user: FirebaseListObservable<any[]>;
  submitted = false;

  onSubmit() {
      this.submitted = true;
  }

  createGame() {
      this.games.push(this.newGame).then((item) => {
          this.user.update(this.uid, {activeGame: item.key});
          this.af.database.list('games/'+item.key+'/players/').update(
              this.uid,
              {
                  isAlive: true
              }
          );
      });
  }

  constructor(af: AngularFire) {
    this.af = af;
    af.auth.subscribe((auth) => {
        this.uid = auth.uid;
    });

    this.games = af.database.list('/games');
    this.user = af.database.list('/users/');
  }

  ngOnInit() {
  }

}
