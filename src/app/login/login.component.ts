import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.af.auth.login().then(auth => {
      if(auth != null) {
        const items = this.af.database.list('/users', {
          query: {
            orderByKey: true,
            equalTo: this.authService.getUID()
          }
        }).subscribe(response => {
          if(response.length === 0) {
            this.af.database.list('/users/').update(this.authService.getUID(), {
              activeGame: "",
              picture: auth.facebook.photoURL,
              name: auth.facebook.displayName
            });
          }
          items.unsubscribe();
        });
      }
    });
  }
}
