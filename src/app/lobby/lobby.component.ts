import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  providers: [GameService]
})
export class LobbyComponent implements OnInit, OnDestroy {

  private gameID;
  private users: FirebaseListObservable<any>;
  private players;
  private uid;
  private playerListener;
  private leaveListener;

  constructor(private route: ActivatedRoute, private af: AngularFire, private router: Router, private gameService: GameService, private authService: AuthService, private location: Location) {
      this.players = [];
      this.route.params.forEach((params: Params) => {
        this.gameID = params["id"];
      });
      this.getAllUsers();
  }

  ngOnInit() {
      this.players = [];
  }
  
  ngOnDestroy() {
      this.playerListener.unsubscribe();
  }

  leaveGame() {
      console.log("leave", this.authService.getUID());
      this.leaveListener = this.af.database.list('/games/'+this.gameID+'/players/').remove(this.authService.getUID()).then(
          () => {
              this.af.database.object('/users/'+this.uid+'/activeGame').set("").then(
                  () => {
                      this.players = [];
                      this.router.navigate(['menu']);
                  }
              )
          }
      )
  }

  goBack(): void {
    this.location.back();
  }

  startGame() {
      this.gameService.startGame(this.gameID);
  }

  getAllUsers() {
    this.playerListener = this.af.database.list('/games/'+this.gameID+'/players/').subscribe(
        (playerList) => {
            playerList.forEach(
                (player) => {
                    this.players = [];
                    const userListener = this.af.database.object('/users/'+ player.$key).subscribe(
                        (result) => {
                            this.players.push({
                                name: result.name,
                                picture: result.picture
                            });
                            userListener.unsubscribe();
                        }
                    )
                }
            );
        }
    )
  }

}
