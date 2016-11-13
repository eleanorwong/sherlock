import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  clickflag = false;

  isLoading: boolean;
  uid: string;
  name: string;
  activeGameID: string;
  players: any;
  votedPlayer: any;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.isLoading = false;
    this.players = [];
    this.af.database.object('/users/' + this.authService.getUID()).subscribe(result => {
      this.name = result.name;
    })
    this.getValidVoters();
  }

  getValidVoters () {
    //console.log(this.uid);
    const activeGameID = this.af.database.object('/users/' + this.authService.getUID() + '/activeGame');
    activeGameID.subscribe( result => {
      const playersListner = this.af.database.list('/games/' + result.$value + '/players/');
      playersListner.subscribe(playerList => {
        playerList.forEach( player => {
          //console.log(player)
          this.af.database.object('/users/' + player.$key).subscribe(result => {
            this.players.push(
              {
                name: result.name,
                isAlive: player.isAlive,
                uid: player.$key
              });
          });
        });
      });
    });
  }

  collectVote() {
  }

  clicked() {
    this.clickflag = !this.clickflag;
  }

  onSubmit() {
    console.log(this.votedPlayer)
  }

  ngOnInit() {

  }

}
