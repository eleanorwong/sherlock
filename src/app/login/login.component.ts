import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire) { }

  ngOnInit() {
  }

  login() {
    this.af.auth.login().then(auth => {
      const items = this.af.database.list('/users', {
        query: {
          orderByChild: "uid",
          equalTo: auth.uid
        }
      }).subscribe(response => {
        if(response.length === 0) {
          this.af.database.list('/users').push({ uid: auth.uid, pastGames: [], activeGame: "" });
        }
        items.unsubscribe();
      });
    });
  }

  logout() {
     this.af.auth.logout();
  }
}
