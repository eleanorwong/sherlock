import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(public af: AngularFire, private router: Router) {

    this.af.auth.subscribe(auth => {
      if(auth != null) {
        this.router.navigate(['menu']);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

  login() {
    this.af.auth.login().then(auth => {
      if(auth != null) {
        const items = this.af.database.list('/users', {
          query: {
            orderByKey: true,
            equalTo: auth.uid
          }
        }).subscribe(response => {
          if(response.length === 0) {
            this.af.database.list('/users/').update(auth.uid, {
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
