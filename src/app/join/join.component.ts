import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  gameID: string;
  isLoading: boolean;
  uid: string;

  constructor(private af: AngularFire, private location: Location, private router: Router, private authService: AuthService) {
    this.isLoading = false;
    this.af.auth.subscribe((auth) => {
        this.uid = authService.getUID();
    })
  }

  ngOnInit() {
  }


  joinGame() {
      if (this.gameID === undefined) {
          return;
      }
      this.isLoading = true;

      const game = this.af.database.object('/games/'+this.gameID, {preserveSnapshot: true});

      game.subscribe((snapshot) => {
          if(snapshot.exists()) {
                this.af.database.list('games/'+this.gameID+'/players/').update(
                    this.uid,
                    {
                        isAlive: true
                    }
                );
                this.af.database.list('/users/').update(this.uid, {activeGame: this.gameID});
          }
          this.router.navigate([this.gameID+'/lobby/'])
      })


      this.isLoading = false;
  }

  goBack() {
    this.location.back();
  }
}
