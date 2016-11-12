import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private title = 'app works!';
  private showNav: boolean;

  constructor(private af: AngularFire, private router: Router) {
    //console.log(router);
    this.af.auth.subscribe(auth => {
      //console.log(auth);
      this.showNav = (auth != null);
      if(auth == null) {
        this.router.navigate(['login']);
      }
      if(this.router.url === '/login' && auth != null) {
        this.router.navigate(['menu']);
      }
    });
  }

  logout() {
     this.af.auth.logout();
  }
}
