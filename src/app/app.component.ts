import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(private af: AngularFire, private router: Router) {

  }

  logout() {
     this.af.auth.logout();
     this.router.navigate(['login']);
  }
}
