import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  gameID: string;
  isLoading: boolean;
  af: AngularFire;
  uid: string;

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
      })


      this.isLoading = false;
  }

  constructor(af: AngularFire) {
      this.af = af;
      this.isLoading = false;
      this.af.auth.subscribe((auth) => {
          this.uid = auth.uid;
      })
  }

  ngOnInit() {
  }

}
