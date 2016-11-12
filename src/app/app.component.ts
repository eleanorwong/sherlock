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
    af.auth.subscribe(auth => {
      this.showNav = (auth != null);
      if(!this.showNav) {
        this.router.navigate(['login']);
      }
      if(auth != null) {
        this.router.navigate(['menu']); 
      }
    });

  }

  logout() {
     this.af.auth.logout();
  }
}
