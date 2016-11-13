import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  ngOnInit() {
  }

  constructor(af: AngularFire, private router: Router, private location: Location, private authService: AuthService) {
    this.af = af;

    this.games = af.database.list('/games');
    this.user = af.database.list('/users/');
  }

  newGame: Game = {
      config: {
          dayLength: 5,
          nightLength: 5
      },
      players: [],
      active: false
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
          this.user.update(this.authService.getUID(), {activeGame: item.key});
          this.af.database.list('games/' + item.key + '/players/').update(
              this.authService.getUID(),
              {
                  isAlive: true
              }
          );
          this.router.navigate([item.key, 'lobby']);
      });

  }

  goBack(): void {
    this.location.back();
  }

}
