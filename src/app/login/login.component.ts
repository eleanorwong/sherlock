import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public af: AngularFire, private router: Router) { 

    this.af.auth.subscribe(auth => {
      if(auth != null) {
        this.router.navigate(['menu']); 
      }
    });
  }

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
          this.af.database.list('/users/').update(auth.uid, { 
            name: auth.facebook.displayName, 
            picture: auth.facebook.photoURL, 
            activeGame: "" 
          });
        }
        items.unsubscribe();
      });
    });
  }
}
