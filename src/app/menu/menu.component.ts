import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private users;

  constructor(private af: AngularFire, private authService: AuthService) {
    this.users = this.af.database.object('/users/' + this.authService.getUID());
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.users.unsubscribe();
  }

}
