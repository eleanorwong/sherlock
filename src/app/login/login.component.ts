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
          orderByKey: true,
          equalTo: auth.uid
        }
      }).subscribe(response => {
        if(response.length === 0) {
          this.af.database.list('/users/').update(auth.uid, { activeGame: "" });
        }
        items.unsubscribe();
      });
    });
  }

  logout() {
     this.af.auth.logout();
  }
}
