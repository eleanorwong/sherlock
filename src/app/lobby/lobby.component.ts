import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [GameService]
})
export class LobbyComponent implements OnInit {

  private gameID;
  private users: FirebaseListObservable<any>;
  private players;
  private uid;

  constructor(private route: ActivatedRoute, private af: AngularFire, private router: Router, private gameService: GameService) {
      this.players = [];
      this.route.params.forEach((params: Params) => {
        this.gameID = params["id"];
      });
      this.af.auth.subscribe((auth) => {
          this.uid = auth.uid;
          this.getAllUsers();
      })
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.gameID = params["id"];
    });
  }

  leaveGame() {
      console.log("leave", this.uid);
      this.af.database.list('/games/'+this.gameID+'/players/').remove(this.uid).then(
          () => {
              this.router.navigate(['menu']);
          }
      )
  }

  startGame() {
      this.gameService.startGame(this.gameID);
  }

  getAllUsers() {
    this.af.database.list('/games/'+this.gameID+'/players/').subscribe(
        (playerList) => {
            playerList.forEach(
                (player) => {
                    this.af.database.object('/users/'+ player.$key).subscribe(
                        (result) => {
                            this.players.push({
                                name: result.name,
                                picture: result.picture
                            });
                        }
                    )
                }
            )
        }
    )
  }

}
