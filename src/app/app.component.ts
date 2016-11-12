import { Component } from '@angular/core';
// import { AngularFire } from 'AngularFire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor() {

  }

  logout() {
    //  this.af.auth.logout();
  }
}
