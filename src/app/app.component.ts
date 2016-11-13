import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private af: AngularFire, private router: Router, private authService: AuthService) {

  }

  logout() {
     this.af.auth.logout();
  }

  shouldShowNav() {
    return this.authService.shouldShowNav();
  }
}
