import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  isLoading: boolean;
  uid: string;
  activeGameID: string;
  players: any;

  constructor(private af: AngularFire) {
    this.isLoading = false;
    this.af.auth.subscribe((auth) => {
        this.uid = auth.uid;
        this.getValidVoters();
    })
  }

  getValidVoters () {
    console.log(this.uid);
    const activeGameID = this.af.database.object('/users/' + this.uid + '/activeGame');
    activeGameID.subscribe( result => {
      const players = this.af.database.list('/games/' + result.$value + '/players/');
      players.subscribe(result => {
        console.log(result);
        this.players = result;
      })
    })
  }

  ngOnInit() {

  }

}
